import { Modal, Button, Label, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { addProduto, editProduto } from 'src/services/produtosService';
import { auth } from 'src/firebase/config';
import { toast } from 'react-toastify';

interface ProdutoModalProps {
    produto: any;
    onClose: () => void;
}

export default function ProdutoModal({ produto, onClose }: ProdutoModalProps) {
    const [titulo, setTitulo] = useState(produto?.titulo || '');
    const [descricao, setDescricao] = useState(produto?.descricao || '');
    const [quantidade, setQuantidade] = useState(produto?.quantidade || 0);
    const [valorBruto, setValorBruto] = useState(produto?.valor_bruto || 0);
    const [valorFinal, setValorFinal] = useState(produto?.valor_final || 0);

    const handleSubmit = async () => {
        try {
            const data = {
                titulo,
                descricao,
                quantidade,
                valor_bruto: valorBruto,
                valor_final: valorFinal,
                criado_por: auth.currentUser?.uid,
                criado_nome: auth.currentUser?.displayName || "Usuário",
            };

            if (produto?.id) {
                await editProduto(produto.id, data);
                toast.success("Produto atualizado!");
            } else {
                await addProduto(data);
                toast.success("Produto criado!");
            }

            onClose();
        } catch (e: any) {
            toast.error("Erro ao salvar produto");
        }
    };

    return (
        <Modal show={true} onClose={onClose}>
            <Modal.Header>{produto ? "Editar Produto" : "Novo Produto"}</Modal.Header>
            <Modal.Body>
                <div className="flex flex-col gap-4">
                    <TextInput placeholder="Título" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
                    <TextInput placeholder="Descrição" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
                    <TextInput placeholder="Quantidade" type="number" value={quantidade} onChange={(e) => setQuantidade(+e.target.value)} />
                    <TextInput placeholder="Valor Bruto" type="number" value={valorBruto} onChange={(e) => setValorBruto(+e.target.value)} />
                    <TextInput placeholder="Valor Final" type="number" value={valorFinal} onChange={(e) => setValorFinal(+e.target.value)} />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleSubmit}>Salvar</Button>
                <Button color="gray" onClick={onClose}>Cancelar</Button>
            </Modal.Footer>
        </Modal>
    );
}
