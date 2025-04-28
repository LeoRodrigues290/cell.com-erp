import React from 'react';

interface ProdutoListProps {
    produtos: any[];
    onEditar: (produto: any) => void;
    onVender: (produto: any) => void;
}

export default function ProdutoList({ produtos, onEditar, onVender }: ProdutoListProps) {
    return (
        <div className="overflow-x-auto rounded-lg shadow bg-white p-4">
            {/* Alerta de Estoque Baixo */}
            {produtos.some(p => p.quantidade < 5) && (
                <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 mb-4 rounded">
                    <p><strong>Atenção:</strong> Alguns produtos estão com estoque baixo!</p>
                    {produtos
                        .filter(p => p.quantidade < 5)
                        .map(p => (
                            <p key={p.id}>O produto <strong>{p.titulo}</strong> está esgotando. Analise repor o estoque!</p>
                        ))}
                </div>
            )}

            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Título</th>
                    <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Valor Bruto</th>
                    <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Valor Final</th>
                    <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Quantidade</th>
                    <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Criado Por</th>
                    <th className="px-6 py-3"></th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {produtos.map(produto => (
                    <tr key={produto.id}>
                        <td className="px-6 py-4 whitespace-nowrap">{produto.titulo}</td>
                        <td className="px-6 py-4 whitespace-nowrap">R$ {produto.valor_bruto}</td>
                        <td className="px-6 py-4 whitespace-nowrap">R$ {produto.valor_final}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{produto.quantidade}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{produto.criado_nome || '-'}</td>
                        <td className="px-6 py-4 flex gap-2">
                            <button
                                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                onClick={() => onVender(produto)}
                            >
                                Vender
                            </button>
                            <button
                                className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                                onClick={() => onEditar(produto)}
                            >
                                ✏️
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
