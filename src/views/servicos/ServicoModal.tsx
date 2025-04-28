import { Modal, Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { addServico, editServico } from "src/services/servicosService";
import { auth } from "src/firebase/config";
import { toast } from "react-toastify";

interface ServicoModalProps {
    servico: any;
    onClose: () => void;
}

export default function ServicoModal({
                                         servico,
                                         onClose,
                                     }: ServicoModalProps) {
    const [titulo, setTitulo] = useState(servico?.titulo || "");
    const [descricao, setDescricao] = useState(servico?.descricao || "");
    const [nomeCliente, setNomeCliente] = useState(
        servico?.nome_cliente || ""
    );
    const [telefoneCliente, setTelefoneCliente] = useState(
        servico?.telefone_cliente || ""
    );
    const [valor, setValor] = useState(servico?.valor || 0);
    const [custoMateriais, setCustoMateriais] = useState(
        servico?.custo_materiais || 0
    );
    const [dataEntrega, setDataEntrega] = useState(
        servico?.data_entrega
            ? servico.data_entrega.toDate().toISOString().split("T")[0]
            : ""
    );

    const handleSubmit = async () => {
        try {
            // Constrói a data de entrega como meia-noite local
            let dataEntregaLocal: Date | null = null;
            if (dataEntrega) {
                const [y, m, d] = dataEntrega.split("-").map(Number);
                dataEntregaLocal = new Date(y, m - 1, d);
            }

            const payload = {
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
                data_entrega: dataEntregaLocal,
            };

            if (servico?.id) {
                await editServico(servico.id, payload);
                toast.success("Serviço atualizado!");
            } else {
                await addServico(payload);
                toast.success("Serviço criado!");
            }

            onClose();
        } catch (e: any) {
            toast.error("Erro ao salvar serviço");
        }
    };

    return (
        <Modal show={true} onClose={onClose}>
            <Modal.Header>
                {servico?.id ? "Editar Serviço" : "Novo Serviço"}
            </Modal.Header>
            <Modal.Body>
                <div className="flex flex-col gap-4">
                    <div>
                        <Label value="Título" />
                        <TextInput
                            value={titulo}
                            onChange={e => setTitulo(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label value="Descrição" />
                        <TextInput
                            value={descricao}
                            onChange={e => setDescricao(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label value="Nome Cliente" />
                        <TextInput
                            value={nomeCliente}
                            onChange={e => setNomeCliente(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label value="Telefone Cliente" />
                        <TextInput
                            value={telefoneCliente}
                            onChange={e => setTelefoneCliente(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label value="Valor" />
                        <TextInput
                            type="number"
                            value={valor}
                            onChange={e => setValor(+e.target.value)}
                        />
                    </div>
                    <div>
                        <Label value="Custo Materiais" />
                        <TextInput
                            type="number"
                            value={custoMateriais}
                            onChange={e => setCustoMateriais(+e.target.value)}
                        />
                    </div>
                    <div>
                        <Label value="Data de Entrega" />
                        <TextInput
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
}
