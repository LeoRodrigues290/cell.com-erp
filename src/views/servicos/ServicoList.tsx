interface ServicoListProps {
    servicos: any[];
    onEditar: (servico: any) => void;
    onFinalizar: (servico: any) => void;
}

export default function ServicoList({ servicos, onEditar, onFinalizar }: ServicoListProps) {
    return (
        <div className="overflow-x-auto rounded-lg shadow bg-white p-4">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                <tr>
                    <th className="px-6 py-3">Título</th>
                    <th className="px-6 py-3">Cliente</th>
                    <th className="px-6 py-3">Telefone</th>
                    <th className="px-6 py-3">Descrição</th>
                    <th className="px-6 py-3">Valor</th>
                    <th className="px-6 py-3">Custo Materiais</th>
                    <th className="px-6 py-3">Data Entrada</th>
                    <th className="px-6 py-3">Data Entrega</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Criado Por</th>
                    <th className="px-6 py-3"></th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {servicos.map(servico => (
                    <tr key={servico.id}>
                        <td className="px-6 py-4">{servico.titulo}</td>
                        <td className="px-6 py-4">{servico.nome_cliente}</td>
                        <td className="px-6 py-4">{servico.telefone_cliente}</td>
                        <td className="px-6 py-4">{servico.descricao}</td>
                        <td className="px-6 py-4">R$ {servico.valor}</td>
                        <td className="px-6 py-4">R$ {servico.custo_materiais}</td>
                        <td className="px-6 py-4">{servico.data_entrada?.toDate().toLocaleDateString()}</td>
                        <td className="px-6 py-4">{servico.data_entrega?.toDate().toLocaleDateString() || "-"}</td>
                        <td className="px-6 py-4">{servico.status}</td>
                        <td className="px-6 py-4">{servico.criado_nome}</td>
                        <td className="px-6 py-4 flex gap-2">
                            <button
                                className="bg-yellow-400 text-white px-2 py-1 rounded"
                                onClick={() => onEditar(servico)}
                            >
                                ✏️
                            </button>
                            {servico.status !== "finalizado" && (
                                <button
                                    className="bg-green-500 text-white px-2 py-1 rounded"
                                    onClick={() => onFinalizar(servico)}
                                >
                                    Finalizar
                                </button>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
