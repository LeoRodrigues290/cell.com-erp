import { useState, useEffect } from "react";
import { useServicos } from "src/hooks/useServicos";
import { fetchServicosPage, finalizarServico } from "src/services/servicosService";
import { toast } from "react-toastify";
import ServicoList from "./ServicoList";
import ServicoModal from "./ServicoModal";
import ConfirmModal from "./ConfirmModal";
import { Button, Select } from "flowbite-react";

export default function ServicosPage() {
    const { servicos, loading } = useServicos();
    const [lastDoc, setLastDoc] = useState<any>(null);
    const [mais, setMais] = useState<any[]>([]);
    const [servicoSelecionado, setServicoSelecionado] = useState<any>(null);
    const [showModal, setShowModal] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [servicoParaFinalizar, setServicoParaFinalizar] = useState<any>(null);
    const [filtroStatus, setFiltroStatus] = useState<string>("aberto_emandamento");

    const carregarMais = async () => {
        try {
            const { lastDoc: next, data } = await fetchServicosPage(lastDoc);
            setMais(prev => [...prev, ...data]);
            setLastDoc(next);
        } catch {
            toast.error("Erro ao carregar mais serviços");
        }
    };

    const handleEditar = (servico: any) => {
        setServicoSelecionado(servico);
        setShowModal(true);
    };

    const handleFinalizar = (servico: any) => {
        setServicoParaFinalizar(servico);
        setShowConfirm(true);
    };

    const confirmarFinalizacao = async () => {
        if (!servicoParaFinalizar) return;

        try {
            await finalizarServico(servicoParaFinalizar.id);
            toast.success("Serviço finalizado com sucesso!");
            setShowConfirm(false);
        } catch {
            toast.error("Erro ao finalizar serviço");
        }
    };

    if (loading) return <div>Carregando serviços...</div>;

    const todos = [...servicos, ...mais];

    // Filtro de serviços pelo status
    const servicosFiltrados = todos
        .filter(s => {
            if (filtroStatus === "aberto_emandamento") {
                return s.status === "aberto" || s.status === "em_andamento";
            }
            return s.status === filtroStatus;
        })
        .sort((a, b) => b.data_entrada?.seconds - a.data_entrada?.seconds);

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Serviços</h1>
                <div className="flex gap-2">
                    <Button color="success" onClick={() => { setServicoSelecionado(null); setShowModal(true); }}>
                        Novo Serviço
                    </Button>

                    <Select value={filtroStatus} onChange={(e) => setFiltroStatus(e.target.value)}>
                        <option value="aberto_emandamento">Abertos/Em andamento</option>
                        <option value="aberto">Abertos</option>
                        <option value="em_andamento">Em andamento</option>
                        <option value="finalizado">Finalizados</option>
                    </Select>
                </div>
            </div>

            <ServicoList servicos={servicosFiltrados} onEditar={handleEditar} onFinalizar={handleFinalizar} />

            {todos.length >= 20 && (
                <div className="flex justify-center mt-6">
                    <Button onClick={carregarMais}>Carregar mais</Button>
                </div>
            )}

            {showModal && (
                <ServicoModal
                    servico={servicoSelecionado}
                    onClose={() => setShowModal(false)}
                />
            )}

            {showConfirm && (
                <ConfirmModal
                    show={showConfirm}
                    onClose={() => setShowConfirm(false)}
                    onConfirm={confirmarFinalizacao}
                    message="Tem certeza que deseja finalizar este serviço?"
                />
            )}
        </div>
    );
}
