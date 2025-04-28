import { Modal, Button, Label, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { addServico, editServico } from 'src/services/servicosService';
import { auth } from 'src/firebase/config';
import { toast } from 'react-toastify';

interface ServicoModalProps {
    servico: any;
    onClose: () => void;
}

export default function ServicoModal({ servico, onClose }: ServicoModalProps) {
    const [titulo, setTitulo] = useState(servico?.titulo || '');
    const [descricao, setDescricao] = useState(servico?.descricao || '');
    const [nomeCliente, setNomeCliente] = useState(servico?.nome_cliente || '');
    const [telefoneCliente, setTelefoneCliente] = useState(servico?.telefone_cliente || '');
    const [valor, setValor] = useState(servico?.valor || 0);
    const [custoMateriais, setCustoMateriais] = useState(servico?.custo_materiais || 0);

    const handleSubmit = async () => {
        try {
            const data = {
                titulo,
                descricao,
                nome_cliente: nomeCliente,
                telefone_cliente: telefoneCliente,
                valor,
                custo_materiais: custoMateriais,
                status: servico?.status || "aberto",
                criado_por: auth.currentUser?.uid,
                criado_nome: auth.currentUser?.displayName || "Usuário",
                data_entrada: servico?.data_entrada || new Date(),
            };

            if (servico?.id) {
                await editServico(servico.id, data);
                toast.success("Serviço atualizado!");
            } else {
                await addServico(data);
                toast.success("Serviço criado!");
            }

            onClose();
        } catch (e: any) {
            toast.error("Erro ao salvar serviço");
        }
    };

    return (
        <Modal show={true} onClose={onClose}>
            <Modal.Header>{servico ? "Editar Serviço" : "Novo Serviço"}</Modal.Header>
            <Modal.Body>
                <div className="flex flex-col gap-4">
                    <div>
                        <Label htmlFor="titulo" value="Título" />
                        <TextInput id="titulo" placeholder="Título" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
                    </div>

                    <div>
                        <Label htmlFor="descricao" value="Descrição" />
                        <TextInput id="descricao" placeholder="Descrição" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
                    </div>

                    <div>
                        <Label htmlFor="nomeCliente" value="Nome Cliente" />
                        <TextInput id="nomeCliente" placeholder="Nome do Cliente" value={nomeCliente} onChange={(e) => setNomeCliente(e.target.value)} />
                    </div>

                    <div>
                        <Label htmlFor="telefoneCliente" value="Telefone Cliente" />
                        <TextInput id="telefoneCliente" placeholder="Telefone" value={telefoneCliente} onChange={(e) => setTelefoneCliente(e.target.value)} />
                    </div>

                    <div>
                        <Label htmlFor="valor" value="Valor" />
                        <TextInput id="valor" type="number" placeholder="Valor" value={valor} onChange={(e) => setValor(+e.target.value)} />
                    </div>

                    <div>
                        <Label htmlFor="custoMateriais" value="Custo de Materiais" />
                        <TextInput id="custoMateriais" type="number" placeholder="Custo Materiais" value={custoMateriais} onChange={(e) => setCustoMateriais(+e.target.value)} />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleSubmit}>Salvar</Button>
                <Button color="gray" onClick={onClose}>Cancelar</Button>
            </Modal.Footer>
        </Modal>
    );
}
