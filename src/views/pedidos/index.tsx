import { useState } from "react";
import { usePedidos } from "src/hooks/usePedidos";
import { fetchPedidosPage, resolverPedido, cancelarPedido } from "src/services/pedidosService";
import { toast } from "react-toastify";

export default function PedidosPage() {
    const { pedidos, loading } = usePedidos();
    const [lastDoc, setLastDoc] = useState<any>(null);
    const [mais, setMais] = useState<any[]>([]);

    const carregarMais = async () => {
        try {
            const { lastDoc: next, data } = await fetchPedidosPage(lastDoc);
            setMais(prev => [...prev, ...data]);
            setLastDoc(next);
        } catch {
            toast.error("Erro ao carregar mais pedidos");
        }
    };

    if (loading) return <div>Carregando pedidos...</div>;

    const todos = [...pedidos, ...mais];

    return (
        <div className="p-4">
            <h1 className="text-2xl mb-4">Pedidos</h1>
            <ul className="space-y-2">
                {todos.map(pedido => (
                    <li key={pedido.id} className="flex flex-col gap-2">
                        <span>{pedido.descricao} — Status: {pedido.status}</span>
                        {pedido.status === "aberto" && (
                            <div className="flex gap-2">
                                <button
                                    onClick={() => resolverPedido(pedido.id).then(() => toast.success("Pedido resolvido")).catch(e => toast.error(e.message))}
                                    className="bg-green-500 text-white px-2 py-1 rounded"
                                >
                                    Resolver
                                </button>
                                <button
                                    onClick={() => cancelarPedido(pedido.id).then(() => toast.success("Pedido cancelado")).catch(e => toast.error(e.message))}
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                >
                                    Cancelar
                                </button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>

            <button onClick={carregarMais} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                Carregar mais
            </button>
        </div>
    );
}
