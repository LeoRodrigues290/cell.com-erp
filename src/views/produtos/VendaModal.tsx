import { Modal, Button, Label, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { registrarVenda } from 'src/services/vendasService';
import { auth } from 'src/firebase/config';
import { toast } from 'react-toastify';
import { serverTimestamp } from 'firebase/firestore';

interface VendaModalProps {
    produto: any;
    onClose: () => void;
}

export default function VendaModal({ produto, onClose }: VendaModalProps) {
    const [cliente, setCliente] = useState('');
    const [telefone, setTelefone] = useState('');
    const [quantidade, setQuantidade] = useState(1);

    const handleSubmit = async () => {
        try {
            await registrarVenda({
                produto_id: produto.id,
                produto_nome: produto.titulo,
                cliente,
                telefone,
                quantidade,
                vendido_por: auth.currentUser?.displayName || "Usuário",
                data_venda: serverTimestamp(),
            });
            toast.success("Venda registrada!");
            onClose();
        } catch (e: any) {
            toast.error("Erro ao registrar venda");
        }
    };

    return (
        <Modal show={true} onClose={onClose}>
            <Modal.Header>Registrar Venda</Modal.Header>
            <Modal.Body>
                <div className="flex flex-col gap-4">
                    <TextInput placeholder="Nome do Cliente" value={cliente} onChange={(e) => setCliente(e.target.value)} />
                    <TextInput placeholder="Telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
                    <TextInput placeholder="Quantidade" type="number" min="1" value={quantidade} onChange={(e) => setQuantidade(+e.target.value)} />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleSubmit}>Vender</Button>
                <Button color="gray" onClick={onClose}>Cancelar</Button>
            </Modal.Footer>
        </Modal>
    );
}
