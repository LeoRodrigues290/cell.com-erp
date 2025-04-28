// src/views/pedidos/ConfirmarPedidoModal.tsx
import { FC } from "react";
import { Modal, Button } from "flowbite-react";

interface Props {
    action: "resolvido" | "cancelado";
    onConfirm: () => void;
    onCancel: () => void;
}

const MENSAGENS = {
    resolvido: "Tem certeza que deseja marcar este pedido como resolvido?",
    cancelado: "Tem certeza que deseja cancelar este pedido?",
} as const;

const ConfirmarPedidoModal: FC<Props> = ({ action, onConfirm, onCancel }) => (
    <Modal show onClose={onCancel}>
        <Modal.Header>Confirmar Ação</Modal.Header>
        <Modal.Body>{MENSAGENS[action]}</Modal.Body>
        <Modal.Footer>
            <Button onClick={onConfirm}>Confirmar</Button>
            <Button color="gray" onClick={onCancel}>
                Cancelar
            </Button>
        </Modal.Footer>
    </Modal>
);

export default ConfirmarPedidoModal;
