import { FC, useState }   from "react"
import { Modal, Button, Label, TextInput } from "flowbite-react"

interface Props {
    onClose: () => void
    onSave:  (descricao: string) => void
}

const PedidoModal: FC<Props> = ({ onClose, onSave }) => {
    const [desc, setDesc] = useState("")

    return (
        <Modal
            show
            onClose={onClose}
            className="rounded-2xl bg-white dark:bg-gray-800"
        >
            <Modal.Header className="text-gray-900 dark:text-gray-100">
                Novo Pedido
            </Modal.Header>
            <Modal.Body className="space-y-4 text-gray-700 dark:text-gray-200">
                <div>
                    <Label htmlFor="desc" value="Descrição" />
                    <TextInput
                        id="desc"
                        type="text"
                        value={desc}
                        onChange={e => setDesc(e.target.value)}
                        className="
              mt-2
              bg-gray-100 dark:bg-gray-700
              border border-gray-300 dark:border-gray-600
              text-gray-900 dark:text-gray-100
              rounded-lg w-full
              focus:ring-2 focus:ring-primary
            "
                    />
                </div>
            </Modal.Body>
            <Modal.Footer className="space-x-2">
                <Button onClick={() => onSave(desc)}>Salvar</Button>
                <Button color="gray" onClick={onClose}>
                    Cancelar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default PedidoModal
