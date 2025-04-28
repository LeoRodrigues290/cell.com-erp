import { useState } from "react";
import { useServicos } from "src/hooks/useServicos";
import { addServico, editServico, finalizarServico } from "src/services/servicosService";
import ServicoList from "./ServicoList";
import ServicoModal from "./ServicoModal";
import ServicoDetailModal from "./ServicoDetailModal";
import ConfirmarFinalizacaoModal from "./ConfirmarFinalizacaoModal";
import { toast } from "react-toastify";

export default function ServicosPage() {
    const { servicos, loading } = useServicos();
    const [modalServico, setModalServico] = useState<any>(null);
    const [modalDetalhe, setModalDetalhe] = useState<any>(null);
    const [confirmarFinalizacao, setConfirmarFinalizacao] = useState<any>(null);

    const handleSalvarServico = async (dados: any) => {
        try {
            if (modalServico?.id) {
                await editServico(modalServico.id, dados);
                toast.success("Serviço atualizado!");
            } else {
                await addServico(dados);
                toast.success("Serviço criado!");
            }
            setModalServico(null);
        } catch (error) {
            toast.error("Erro ao salvar serviço.");
        }
    };

    const handleFinalizarServico = async () => {
        if (!confirmarFinalizacao) return;
        try {
            await finalizarServico(confirmarFinalizacao.id);
            toast.success("Serviço finalizado!");
            setConfirmarFinalizacao(null);
        } catch (error) {
            toast.error("Erro ao finalizar serviço.");
        }
    };

    if (loading) return <div>Carregando serviços...</div>;

    return (
        <div className="p-4">
            <ServicoList
                servicos={servicos}
                onNovo={() => setModalServico({})}
                onEditar={servico => setModalServico(servico)}
                onDetalhes={servico => setModalDetalhe(servico)}
                onFinalizar={servico => setConfirmarFinalizacao(servico)}
            />

            {modalServico && (
                <ServicoModal
                    servico={modalServico}
                    onClose={() => setModalServico(null)}
                    onSalvar={handleSalvarServico}
                />
            )}

            {modalDetalhe && (
                <ServicoDetailModal
                    servico={modalDetalhe}
                    onClose={() => setModalDetalhe(null)}
                />
            )}

            {confirmarFinalizacao && (
                <ConfirmarFinalizacaoModal
                    onConfirmar={handleFinalizarServico}
                    onCancelar={() => setConfirmarFinalizacao(null)}
                />
            )}
        </div>
    );
}
