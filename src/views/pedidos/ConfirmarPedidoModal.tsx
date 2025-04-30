import { FC } from "react"
import { Modal, Button } from "flowbite-react"

interface Props {
    action: "resolvido" | "cancelado"
    onConfirm: () => void
    onCancel: () => void
}

const MENSAGENS = {
    resolvido: "Tem certeza que deseja marcar este pedido como resolvido?",
    cancelado: "Tem certeza que deseja cancelar este pedido?",
} as const

const ConfirmarPedidoModal: FC<Props> = ({ action, onConfirm, onCancel }) => (
    <Modal
        show
        onClose={onCancel}
        className="rounded-2xl bg-white dark:bg-gray-800"
    >
        <Modal.Header className="text-gray-900 dark:text-gray-100">
            Confirmar Ação
        </Modal.Header>
        <Modal.Body className="text-gray-700 dark:text-gray-200">
            {MENSAGENS[action]}
        </Modal.Body>
        <Modal.Footer className="space-x-2">
            <Button color="gray" onClick={onCancel}>
                Cancelar
            </Button>
            <Button onClick={onConfirm}>Confirmar</Button>
        </Modal.Footer>
    </Modal>
)

export default ConfirmarPedidoModal
