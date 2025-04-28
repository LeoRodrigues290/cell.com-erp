import { useState } from "react";
import { useProdutos } from "src/hooks/useProdutos";
import ProdutoList from "./ProdutoList";
import ProdutoModal from "./ProdutoModal";
import VendaModal from "./VendaModal";
import VendasRealizadas from "./VendasRealizadas";

export default function ProdutosPage() {
    const { produtos, loading } = useProdutos();
    const [showProdutoModal, setShowProdutoModal] = useState(false);
    const [showVendaModal, setShowVendaModal] = useState(false);
    const [showVendasRealizadas, setShowVendasRealizadas] = useState(false);
    const [produtoSelecionado, setProdutoSelecionado] = useState<any>(null);

    const handleEditarProduto = (produto: any) => {
        setProdutoSelecionado(produto);
        setShowProdutoModal(true);
    };

    const handleVenderProduto = (produto: any) => {
        setProdutoSelecionado(produto);
        setShowVendaModal(true);
    };

    if (loading) return <div>Carregando produtos...</div>;

    return (
        <div className="p-4 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Produtos</h1>
                <div className="flex gap-4">
                    <button
                        className="bg-green-600 text-white px-4 py-2 rounded"
                        onClick={() => setShowProdutoModal(true)}
                    >
                        Novo Produto
                    </button>
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                        onClick={() => setShowVendasRealizadas(true)}
                    >
                        Vendas Realizadas
                    </button>
                </div>
            </div>

            {showVendasRealizadas ? (
                <VendasRealizadas onVoltar={() => setShowVendasRealizadas(false)} />
            ) : (
                <ProdutoList
                    produtos={produtos}
                    onEditar={handleEditarProduto}
                    onVender={handleVenderProduto}
                />
            )}

            {/* Modal Criar/Editar Produto */}
            {showProdutoModal && (
                <ProdutoModal
                    produto={produtoSelecionado}
                    onClose={() => {
                        setProdutoSelecionado(null);
                        setShowProdutoModal(false);
                    }}
                />
            )}

            {/* Modal Vender Produto */}
            {showVendaModal && (
                <VendaModal
                    produto={produtoSelecionado}
                    onClose={() => {
                        setProdutoSelecionado(null);
                        setShowVendaModal(false);
                    }}
                />
            )}
        </div>
    );
}
