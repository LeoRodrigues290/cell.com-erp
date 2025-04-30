// src/views/servicos/ServicoModal.tsx
import React, { FC, useState } from 'react';
import { Modal, Button, Label, TextInput } from 'flowbite-react';
import { addServico, editServico } from 'src/services/servicosService';
import { auth } from 'src/firebase/config';
import { toast } from 'react-toastify';

interface ServicoModalProps {
    servico: any;
    onClose: () => void;
}

const ServicoModal: FC<ServicoModalProps> = ({ servico, onClose }) => {
    const [titulo, setTitulo] = useState(servico?.titulo || '');
    const [descricao, setDescricao] = useState(servico?.descricao || '');
    const [nomeCliente, setNomeCliente] = useState(servico?.nome_cliente || '');
    const [telefoneCliente, setTelefoneCliente] = useState(servico?.telefone_cliente || '');
    const [valor, setValor] = useState<number>(servico?.valor || 0);
    const [custoMateriais, setCustoMateriais] = useState<number>(servico?.custo_materiais || 0);
    const [dataEntrega, setDataEntrega] = useState(
        servico?.data_entrega
            ? servico.data_entrega.toDate().toISOString().substr(0, 10)
            : ''
    );

    const handleSubmit = async () => {
        try {
            let dataEntregaLocal: Date | null = null;
            if (dataEntrega) {
                const [y, m, d] = dataEntrega.split('-').map(Number);
                dataEntregaLocal = new Date(y, m - 1, d);
            }

            const payload = {
                titulo,
                descricao,
                nome_cliente: nomeCliente,
                telefone_cliente: telefoneCliente,
                valor,
                custo_materiais: custoMateriais,
                status: servico?.status || 'aberto',
                criado_por: auth.currentUser?.uid,
                criado_nome: auth.currentUser?.displayName || 'Usuário',
                data_entrada: servico?.data_entrada || new Date(),
                data_entrega: dataEntregaLocal,
            };

            if (servico?.id) {
                await editServico(servico.id, payload);
                toast.success('Serviço atualizado!');
            } else {
                await addServico(payload);
                toast.success('Serviço criado!');
            }

            onClose();
        } catch {
            toast.error('Erro ao salvar serviço');
        }
    };

    return (
        <Modal show onClose={onClose}>
            <Modal.Header>
                {servico?.id ? 'Editar Serviço' : 'Novo Serviço'}
            </Modal.Header>
            <Modal.Body>
                <div className="flex flex-col gap-4">
                    <div>
                        <Label htmlFor="titulo" value="Título" />
                        <TextInput
                            id="titulo"
                            value={titulo}
                            onChange={e => setTitulo(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label htmlFor="descricao" value="Descrição" />
                        <TextInput
                            id="descricao"
                            value={descricao}
                            onChange={e => setDescricao(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label htmlFor="nomeCliente" value="Nome Cliente" />
                        <TextInput
                            id="nomeCliente"
                            value={nomeCliente}
                            onChange={e => setNomeCliente(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label htmlFor="telefoneCliente" value="Telefone Cliente" />
                        <TextInput
                            id="telefoneCliente"
                            type="tel"
                            placeholder="(xx) xxxxx-xxxx"
                            value={telefoneCliente}
                            onChange={e => setTelefoneCliente(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label htmlFor="valor" value="Valor" />
                        <TextInput
                            id="valor"
                            type="number"
                            value={valor}
                            onChange={e => setValor(+e.target.value)}
                        />
                    </div>
                    <div>
                        <Label htmlFor="custoMateriais" value="Custo Materiais" />
                        <TextInput
                            id="custoMateriais"
                            type="number"
                            value={custoMateriais}
                            onChange={e => setCustoMateriais(+e.target.value)}
                        />
                    </div>
                    <div>
                        <Label htmlFor="dataEntrega" value="Data de Entrega" />
                        <TextInput
                            id="dataEntrega"
                            type="date"
                            value={dataEntrega}
                            onChange={e => setDataEntrega(e.target.value)}
                        />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleSubmit}>Salvar</Button>
                <Button color="gray" onClick={onClose}>
                    Cancelar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ServicoModal;
