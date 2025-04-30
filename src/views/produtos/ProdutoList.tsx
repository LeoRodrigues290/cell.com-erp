// src/views/produtos/ProdutoList.tsx
import React from "react";
import { FiEye, FiShoppingCart, FiEdit2 } from "react-icons/fi";

interface Produto {
    id: string;
    titulo: string;
    descricao?: string;
    quantidade: number;
    valor_bruto: number;
    valor_final: number;
    criado_nome?: string;
    imagem?: string;
}

interface Props {
    produtos: Produto[];
    onVisualizar: (p: Produto) => void;
    onVender:     (p: Produto) => void;
    onEditar:     (p: Produto) => void;
}

export default function ProdutoList({
                                        produtos,
                                        onVisualizar,
                                        onVender,
                                        onEditar,
                                    }: Props) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
                <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-600 dark:text-gray-300">
                        Produto
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-semibold uppercase text-gray-600 dark:text-gray-300">
                        Valor Custo
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-semibold uppercase text-gray-600 dark:text-gray-300">
                        Valor Venda
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-semibold uppercase text-gray-600 dark:text-gray-300">
                        Qtde.
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-600 dark:text-gray-300">
                        Criado por
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-semibold uppercase text-gray-600 dark:text-gray-300">
                        Ações
                    </th>
                </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {produtos.map((p) => (
                    <tr
                        key={p.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                        <td className="px-6 py-4 whitespace-nowrap flex items-center gap-3">
                            {p.imagem && (
                                <img
                                    src={p.imagem}
                                    alt={p.titulo}
                                    className="h-8 w-8 rounded-md object-cover"
                                />
                            )}
                            <span className="text-gray-900 dark:text-gray-100 font-medium">
                  {p.titulo}
                </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-gray-700 dark:text-gray-300">
                            R$ {p.valor_bruto.toFixed(2).replace(".", ",")}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-gray-700 dark:text-gray-300">
                            R$ {p.valor_final.toFixed(2).replace(".", ",")}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-gray-700 dark:text-gray-300">
                            {p.quantidade}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">
                            {p.criado_nome || "-"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right flex justify-end gap-4">
                            {/* Vender */}
                            <button
                                onClick={() => onVender(p)}
                                className="text-green-500 hover:text-green-600"
                                title="Vender"
                            >
                                <FiShoppingCart size={20} />
                            </button>
                            {/* Editar */}
                            <button
                                onClick={() => onEditar(p)}
                                className="text-yellow-400 hover:text-yellow-500"
                                title="Editar"
                            >
                                <FiEdit2 size={20} />
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
