import { useState } from "react"
import { Icon }      from "@iconify/react"
import { toast }     from "react-toastify"

import { useProdutos }  from "src/hooks/useProdutos"
import ProdutoList      from "./ProdutoList"
import ProdutoModal     from "./ProdutoModal"
import VendaModal       from "./VendaModal"
import VendasRealizadas from "./VendasRealizadas"

export default function ProdutosPage() {
    const { produtos, loading } = useProdutos()
    const [showProdutoModal, setShowProdutoModal] = useState(false)
    const [showVendaModal, setShowVendaModal]       = useState(false)
    const [showVendasRealizadas, setShowVendasRealizadas] = useState(false)
    const [selecionado, setSelecionado]             = useState<any>(null)

    const handleEditar = (p: any) => {
        setSelecionado(p)
        setShowProdutoModal(true)
    }

    const handleVender = (p: any) => {
        setSelecionado(p)
        setShowVendaModal(true)
    }

    if (loading) {
        return <div className="p-6 text-center text-gray-500 dark:text-gray-400">Carregando produtos…</div>
    }

    return (
        <div className="space-y-6 p-6">
            {/* cabeçalho */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                    <Icon icon="solar:tag-bold" width={28} /> Produtos
                </h1>
                <div className="flex gap-3">
                    <button
                        onClick={() => {
                            setSelecionado(null)
                            setShowProdutoModal(true)
                        }}
                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl shadow"
                    >
                        <Icon icon="solar:plus-bold" width={20} /> Novo Produto
                    </button>
                    <button
                        onClick={() => setShowVendasRealizadas(true)}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl shadow"
                    >
                        <Icon icon="solar:shopping-cart-line" width={20} /> Vendas Realizadas
                    </button>
                </div>
            </div>

            {/* lista ou vendas realizadas */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
                {showVendasRealizadas ? (
                    <VendasRealizadas onVoltar={() => setShowVendasRealizadas(false)} />
                ) : (
                    <ProdutoList
                        produtos={produtos}
                        onEditar={handleEditar}
                        onVender={handleVender}
                    />
                )}
            </div>

            {/* modal criar/editar */}
            {showProdutoModal && (
                <ProdutoModal
                    produto={selecionado}
                    onClose={() => {
                        setSelecionado(null)
                        setShowProdutoModal(false)
                    }}
                />
            )}

            {/* modal vender */}
            {showVendaModal && (
                <VendaModal
                    produto={selecionado}
                    onClose={() => {
                        setSelecionado(null)
                        setShowVendaModal(false)
                    }}
                />
            )}
        </div>
    )
}
