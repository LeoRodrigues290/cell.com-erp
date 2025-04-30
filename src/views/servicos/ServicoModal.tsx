// src/views/servicos/ServicoModal.tsx
import React, { FC, useState } from 'react'
import { Modal, Button, Label, TextInput, Select } from 'flowbite-react'
import { auth } from 'src/firebase/config'

interface ServicoModalProps {
    servico: any
    onClose: () => void
    onSalvar: (dados: any) => void
}

const ServicoModal: FC<ServicoModalProps> = ({ servico, onClose, onSalvar }) => {
    const [titulo, setTitulo] = useState(servico?.titulo || '')
    const [descricao, setDescricao] = useState(servico?.descricao || '')
    const [nomeCliente, setNomeCliente] = useState(servico?.nome_cliente || '')
    const [telefoneCliente, setTelefoneCliente] = useState(servico?.telefone_cliente || '')
    const [valor, setValor] = useState<number>(servico?.valor || 0)
    const [custoMateriais, setCustoMateriais] = useState<number>(servico?.custo_materiais || 0)
    const [dataEntrega, setDataEntrega] = useState(
        servico?.data_entrega
            ? servico.data_entrega.toDate().toISOString().substr(0, 10)
            : ''
    )
    const [status, setStatus] = useState<string>(servico?.status || 'aberto')

    const handleSubmit = () => {
        // converte a data de entrega de string yyyy-MM-dd para Date
        let dataEntregaLocal: Date | null = null
        if (dataEntrega) {
            const [y, m, d] = dataEntrega.split('-').map(Number)
            dataEntregaLocal = new Date(y, m - 1, d)
        }

        const payload = {
            titulo,
            descricao,
            nome_cliente: nomeCliente,
            telefone_cliente: telefoneCliente,
            valor,
            custo_materiais: custoMateriais,
            status,                             // ← aqui incluímos o status selecionado
            criado_por: auth.currentUser?.uid,
            criado_nome: auth.currentUser?.displayName || 'Usuário',
            data_entrada: servico?.data_entrada || new Date(),
            data_entrega: dataEntregaLocal,
        }

        onSalvar(payload)
        onClose()
    }

    return (
        <Modal show onClose={onClose} size="3xl">
            <Modal.Header>
                {servico?.id ? 'Editar Serviço' : 'Novo Serviço'}
            </Modal.Header>
            <Modal.Body>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="titulo" value="Título" />
                            <TextInput
                                id="titulo"
                                value={titulo}
                                onChange={e => setTitulo(e.target.value)}
                                required
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
                    </div>

                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="valor" value="Valor (R$)" />
                            <TextInput
                                id="valor"
                                type="number"
                                value={valor}
                                onChange={e => setValor(+e.target.value)}
                            />
                        </div>
                        <div>
                            <Label htmlFor="custoMateriais" value="Custo Materiais (R$)" />
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
                        <div>
                            <Label htmlFor="status" value="Status" />
                            <Select
                                id="status"
                                value={status}
                                onChange={e => setStatus(e.target.value)}
                            >
                                <option value="aberto">Aberto</option>
                                <option value="andamento">Andamento</option>
                                <option value="finalizado">Finalizado</option>
                            </Select>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleSubmit}>
                    Salvar
                </Button>
                <Button color="gray" onClick={onClose}>
                    Cancelar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ServicoModal
