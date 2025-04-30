import { useState } from "react"
import { toast }     from "react-toastify"
import PedidoList               from "./PedidoList"
import PedidoModal              from "./PedidoModal"
import ConfirmarPedidoModal     from "./ConfirmarPedidoModal"
import { usePedidos }           from "src/hooks/usePedidos"
import { addPedido, resolverPedido, cancelarPedido } from "src/services/pedidosService"

export default function PedidosPage() {
    const { pedidos, loading } = usePedidos()
    const [isNewOpen, setNewOpen] = useState(false)
    const [confirm, setConfirm]   = useState<{ id: string; action: "resolvido" | "cancelado" } | null>(null)

    const handleAdd = async (descricao: string) => {
        try {
            await addPedido(descricao)
            toast.success("Pedido realizado!")
            setNewOpen(false)
        } catch {
            toast.error("Erro ao realizar pedido")
        }
    }

    const handleConfirm = async () => {
        if (!confirm) return
        try {
            if (confirm.action === "resolvido") await resolverPedido(confirm.id)
            else await cancelarPedido(confirm.id)
            toast.success(`Pedido ${confirm.action === "resolvido" ? "resolvido" : "cancelado"}!`)
            setConfirm(null)
        } catch {
            toast.error("Erro na ação do pedido")
        }
    }

    if (loading) return <div className="p-6 text-center">Carregando pedidos…</div>

    return (
        <div className="space-y-6 p-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">
                    Pedidos
                </h1>
                <button
                    onClick={() => setNewOpen(true)}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl shadow"
                >
                    Novo Pedido
                </button>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
                <PedidoList
                    pedidos={pedidos}
                    onResolve={(id) => setConfirm({ id, action: "resolvido" })}
                    onCancel={(id)  => setConfirm({ id, action: "cancelado" })}
                />
            </div>

            {isNewOpen && (
                <PedidoModal onClose={() => setNewOpen(false)} onSave={handleAdd} />
            )}

            {confirm && (
                <ConfirmarPedidoModal
                    action={confirm.action}
                    onConfirm={handleConfirm}
                    onCancel={() => setConfirm(null)}
                />
            )}
        </div>
    )
}
