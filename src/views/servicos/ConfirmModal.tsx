import { Modal, Button } from "flowbite-react";

interface ConfirmModalProps {
    show: boolean;
    onClose: () => void;
    onConfirm: () => void;
    message: string;
}

export default function ConfirmModal({ show, onClose, onConfirm, message }: ConfirmModalProps) {
    return (
        <Modal show={show} onClose={onClose}>
            <Modal.Header>Confirmação</Modal.Header>
            <Modal.Body>
                <p className="text-gray-700">{message}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onConfirm} color="success">
                    Confirmar
                </Button>
                <Button onClick={onClose} color="gray">
                    Cancelar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
