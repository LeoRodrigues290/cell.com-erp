// src/views/pedidos/PedidoList.tsx
import {FC, useState} from "react";
import {Pedido} from "./types";
import {formatarData} from "src/utils/formatDate";

interface Props {
    pedidos: Pedido[];
    onResolve: (id: string) => void;
    onCancel: (id: string) => void;
}

const statusLabel = {
    aberto: "Aberto",
    resolvido: "Resolvido",
    cancelado: "Cancelado",
} as const;

const statusClasses = {
    aberto: "bg-gray-100 text-gray-700",
    resolvido: "bg-green-100 text-green-700",
    cancelado: "bg-red-100 text-red-700",
} as const;

const PedidoList: FC<Props> = ({pedidos, onResolve, onCancel}) => {
    const [filtro, setFiltro] = useState<Pedido["status"]>("aberto");
    const filtered = pedidos.filter((p) =>
        filtro === "aberto" ? p.status === "aberto" : p.status === filtro
    );

    return (
        <>
            <div className="flex justify-end mb-2">
                <select
                    className="border rounded px-3 py-2"
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value as any)}
                >
                    <option value="aberto">Abertos</option>
                    <option value="resolvido">Resolvidos</option>
                    <option value="cancelado">Cancelados</option>
                </select>
            </div>

            {filtered.length === 0 ? (
                <p className="text-gray-600">Nenhum pedido encontrado.</p>
            ) : (
                <div className="space-y-4">
                    {filtered.map((p) => (
                        <div
                            key={p.id}
                            className="bg-white p-4 rounded shadow flex justify-between items-center"
                        >
                            <div>
                                <p className="font-semibold">{p.criado_nome}</p>
                                <p className="text-gray-800">{p.descricao}</p>
                                <p className="text-xs text-gray-500">
                                    {formatarData(p.data_criacao)}
                                </p>
                            </div>

                            {p.status === "aberto" ? (
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => onResolve(p.id)}
                                        className="px-3 py-1 bg-green-500 text-white rounded"
                                    >
                                        ✔️
                                    </button>
                                    <button
                                        onClick={() => onCancel(p.id)}
                                        className="px-3 py-1 bg-red-500 text-white rounded"
                                    >
                                        ✖️
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col md:flex-row md:items-center gap-2">
    <span
        className={`px-3 py-1 rounded ${statusClasses[p.status]}`}
    >
      {statusLabel[p.status]}
    </span>
                                    {p.status === "resolvido" && p.resolvido_nome && (
                                        <span className="text-sm text-gray-600">
        Resolvido por: <strong>{p.resolvido_nome}</strong>
      </span>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default PedidoList;
