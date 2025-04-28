import { formatarData } from "../../utils/formatDate";

export default function ServicoDetailModal({
                                               servico,
                                               onClose,
                                           }: any) {
    if (!servico) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-700 text-2xl"
                >
                    ✖️
                </button>
                <h2 className="text-xl font-semibold mb-4">
                    Detalhes do Serviço
                </h2>
                <div className="space-y-2 text-gray-700">
                    <p>
                        <strong>Título:</strong> {servico.titulo}
                    </p>
                    <p>
                        <strong>Cliente:</strong> {servico.nome_cliente}
                    </p>
                    <p>
                        <strong>Telefone:</strong> {servico.telefone_cliente}
                    </p>
                    <p>
                        <strong>Descrição:</strong> {servico.descricao}
                    </p>
                    <p>
                        <strong>Valor:</strong> R$ {servico.valor}
                    </p>
                    <p>
                        <strong>Custo Materiais:</strong> R${" "}
                        {servico.custo_materiais}
                    </p>
                    <p>
                        <strong>Data Entrada:</strong>{" "}
                        {formatarData(servico.data_entrada)}
                    </p>
                    <p>
                        <strong>Data Entrega:</strong>{" "}
                        {formatarData(servico.data_entrega)}
                    </p>
                    <p>
                        <strong>Status:</strong> {servico.status}
                    </p>
                    <p>
                        <strong>Criado Por:</strong> {servico.criado_nome}
                    </p>
                </div>
            </div>
        </div>
    );
}
