import { Modal, Button } from "flowbite-react";

interface ServicoDetailModalProps {
    servico: any;
    onClose: () => void;
}

export default function ServicoDetailModal({ servico, onClose }: ServicoDetailModalProps) {
    if (!servico) return null;

    return (
        <Modal show={true} onClose={onClose}>
            <Modal.Header>Detalhes do Serviço</Modal.Header>
            <Modal.Body>
                <div className="flex flex-col gap-2 text-gray-700">
                    <p><strong>Título:</strong> {servico.titulo}</p>
                    <p><strong>Cliente:</strong> {servico.nome_cliente}</p>
                    <p><strong>Nº Telefone do Cliente:</strong> {servico.telefone_cliente}</p>
                    <p><strong>Descrição:</strong> {servico.descricao}</p>
                    <p><strong>Valor:</strong> R$ {servico.valor}</p>
                    <p><strong>Custo Materiais:</strong> R$ {servico.custo_materiais}</p>
                    <p><strong>Data Entrada:</strong> {servico.data_entrada?.toDate().toLocaleDateString()}</p>
                    <p><strong>Data Entrega:</strong> {servico.data_entrega?.toDate().toLocaleDateString() || '-'}</p>
                    <p><strong>Status:</strong> {servico.status}</p>
                    <p><strong>Criado Por:</strong> {servico.criado_nome}</p>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onClose} color="gray">Fechar</Button>
            </Modal.Footer>
        </Modal>
    );
}
