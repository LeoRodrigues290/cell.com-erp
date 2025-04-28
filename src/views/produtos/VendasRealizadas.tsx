import { useEffect, useState } from 'react';
import { buscarVendas } from 'src/services/vendasService';

interface VendasRealizadasProps {
    onVoltar: () => void;
}

export default function VendasRealizadas({ onVoltar }: VendasRealizadasProps) {
    const [vendas, setVendas] = useState<any[]>([]);

    useEffect(() => {
        buscarVendas().then(setVendas);
    }, []);

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Vendas Realizadas</h2>
                <button
                    className="bg-gray-600 text-white px-4 py-2 rounded"
                    onClick={onVoltar}
                >
                    Voltar para Produtos
                </button>
            </div>
            <div className="overflow-x-auto rounded-lg shadow bg-white p-4">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="px-6 py-3">Produto</th>
                        <th className="px-6 py-3">Cliente</th>
                        <th className="px-6 py-3">Telefone</th>
                        <th className="px-6 py-3">Quantidade</th>
                        <th className="px-6 py-3">Vendido Por</th>
                    </tr>
                    </thead>
                    <tbody>
                    {vendas.map(venda => (
                        <tr key={venda.id}>
                            <td className="px-6 py-4">{venda.produto_nome}</td>
                            <td className="px-6 py-4">{venda.cliente}</td>
                            <td className="px-6 py-4">{venda.telefone}</td>
                            <td className="px-6 py-4">{venda.quantidade}</td>
                            <td className="px-6 py-4">{venda.vendido_por}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
