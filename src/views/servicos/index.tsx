import { useState } from "react";
import { useServicos } from "src/hooks/useServicos";
import { fetchServicosPage, finalizarServico } from "src/services/servicosService";
import { toast } from "react-toastify";

export default function ServicosPage() {
    const { servicos, loading } = useServicos();
    const [lastDoc, setLastDoc] = useState<any>(null);
    const [mais, setMais] = useState<any[]>([]);

    const carregarMais = async () => {
        try {
            const { lastDoc: next, data } = await fetchServicosPage(lastDoc);
            setMais(prev => [...prev, ...data]);
            setLastDoc(next);
        } catch {
            toast.error("Erro ao carregar mais serviços");
        }
    };

    if (loading) return <div>Carregando serviços...</div>;

    const todos = [...servicos, ...mais];

    return (
        <div className="p-4">
            <h1 className="text-2xl mb-4">Serviços</h1>
            <ul className="space-y-2">
                {todos.map(servico => (
                    <li key={servico.id} className="flex justify-between">
                        <span>{servico.titulo}</span>
                        <button
                            onClick={() => finalizarServico(servico.id).then(() => toast.success("Serviço finalizado")).catch(e => toast.error(e.message))}
                            className="bg-green-500 text-white px-2 py-1 rounded"
                        >
                            Finalizar
                        </button>
                    </li>
                ))}
            </ul>

            <button onClick={carregarMais} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                Carregar mais
            </button>
        </div>
    );
}
