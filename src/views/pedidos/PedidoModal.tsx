// src/views/pedidos/PedidoModal.tsx
import { FC, useState } from "react";
import { Modal, Button, Label, TextInput } from "flowbite-react";

interface Props {
    onClose: () => void;
    onSave: (descricao: string) => void;
}

const PedidoModal: FC<Props> = ({ onClose, onSave }) => {
    const [desc, setDesc] = useState("");

    return (
        <Modal show onClose={onClose}>
            <Modal.Header>Novo Pedido</Modal.Header>
            <Modal.Body>
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="desc" value="Descrição" />
                        <TextInput
                            id="desc"
                            type="text"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                        />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => onSave(desc)}>Salvar</Button>
                <Button color="gray" onClick={onClose}>
                    Cancelar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PedidoModal;
