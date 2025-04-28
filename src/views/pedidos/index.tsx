// src/views/pedidos/index.tsx
import { useState } from "react";
import { usePedidos } from "src/hooks/usePedidos";
import PedidoList from "./PedidoList";
import PedidoModal from "./PedidoModal";
import ConfirmarPedidoModal from "./ConfirmarPedidoModal";
import { addPedido, resolverPedido, cancelarPedido } from "src/services/pedidosService";
import { toast } from "react-toastify";

export default function PedidosPage() {
    const { pedidos, loading } = usePedidos();
    const [isNewOpen, setIsNewOpen] = useState(false);
    const [confirm, setConfirm] = useState<{ id: string; action: "resolvido" | "cancelado" } | null>(null);

    const handleAdd = async (descricao: string) => {
        try {
            await addPedido(descricao);
            toast.success("Pedido realizado!");
            setIsNewOpen(false);
        } catch {
            toast.error("Erro ao realizar pedido");
        }
    };

    const handleConfirm = async () => {
        if (!confirm) return;
        try {
            if (confirm.action === "resolvido") await resolverPedido(confirm.id);
            else await cancelarPedido(confirm.id);
            toast.success(`Pedido ${confirm.action === "resolvido" ? "resolvido" : "cancelado"}!`);
            setConfirm(null);
        } catch {
            toast.error("Erro na ação do pedido");
        }
    };

    if (loading) return <div>Carregando pedidos…</div>;

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Pedidos</h1>
                <button
                    onClick={() => setIsNewOpen(true)}
                    className="bg-green-600 text-white px-4 py-2 rounded"
                >
                    Novo Pedido
                </button>
            </div>

            <PedidoList
                pedidos={pedidos}
                onResolve={(id) => setConfirm({ id, action: "resolvido" })}
                onCancel={(id) => setConfirm({ id, action: "cancelado" })}
            />

            {isNewOpen && <PedidoModal onClose={() => setIsNewOpen(false)} onSave={handleAdd} />}

            {confirm && (
                <ConfirmarPedidoModal
                    action={confirm.action}
                    onConfirm={handleConfirm}
                    onCancel={() => setConfirm(null)}
                />
            )}
        </div>
    );
}
