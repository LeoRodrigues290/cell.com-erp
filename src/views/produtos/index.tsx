import { useState } from "react";
import { useProdutos } from "../../hooks/useProdutos";
import {
    fetchProdutosPage, addProduto, editProduto, venderProduto
} from "../../services/produtosService";
import { toast } from "react-toastify";

export default function ProdutosPage() {
    const { produtos, loading } = useProdutos();
    const [lastDoc, setLastDoc] = useState<any>(null);
    const [mais, setMais] = useState<any[]>([]);

    const carregarMais = async () => {
        try {
            const { lastDoc: next, data } = await fetchProdutosPage(lastDoc);
            setMais(prev => [...prev, ...data]);
            setLastDoc(next);
        } catch {
            toast.error("Erro ao carregar mais");
        }
    };

    if (loading) return <div>Carregando produtos…</div>;

    const todos = [...produtos, ...mais];
    const baixo = todos.filter(p => p.quantidade <= 5);

    return (
        <div className="p-4">
            <h1 className="text-2xl mb-4">Produtos</h1>

            {baixo.length > 0 && (
                <div className="bg-red-100 p-2 mb-4">
                    Estoque baixo: {baixo.map(p => p.titulo).join(", ")}
                </div>
            )}

            <ul className="space-y-2">
                {todos.map(p => (
                    <li key={p.id} className="flex justify-between">
                        <span>{p.titulo} — {p.quantidade} un</span>
                        <button
                            className="text-sm px-2 py-1 bg-blue-500 text-white rounded"
                            onClick={() =>
                                venderProduto(p.id, 1)
                                    .then(() => toast.success("Venda registrada"))
                                    .catch(e => toast.error(e.message))
                            }
                        >
                            Vender 1
                        </button>
                    </li>
                ))}
            </ul>

            <button
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
                onClick={carregarMais}
            >
                Carregar mais
            </button>
        </div>
    );
}
