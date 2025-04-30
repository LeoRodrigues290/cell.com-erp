import React, { useState } from "react";
import { FiEye, FiEdit2, FiCheckCircle } from "react-icons/fi";

interface Servico {
    id:               string;
    titulo:           string;
    nome_cliente:     string;
    telefone_cliente: string;
    valor:            number;
    custo_materiais:  number;
    data_entrada:     any;
    data_entrega:     any;
    status:           string;
}

interface Props {
    servicos:     Servico[];
    onNovo:       () => void;
    onEditar:     (s: Servico) => void;
    onDetalhes:   (s: Servico) => void;
    onFinalizar:  (s: Servico) => void;
}

export default function ServicoList({
                                        servicos,
                                        onNovo,
                                        onEditar,
                                        onDetalhes,
                                        onFinalizar,
                                    }: Props) {
    const [filtro, setFiltro] = useState("abertos");
    const hoje = new Date();

    const formatarData = (ts: any) =>
        ts ? ts.toDate().toLocaleDateString("pt-BR") : "-";

    const traduzirStatus = (s: string) =>
        s === "aberto"
            ? "Aberto"
            : s === "em_andamento"
            ? "Em Andamento"
            : "Finalizado";

    const filtrados = servicos.filter(s =>
        filtro === "abertos" ? s.status !== "finalizado" : s.status === filtro
    );

    const avisos = filtrados.filter(s => {
        if (!s.data_entrega) return false;
        const d = s.data_entrega.toDate();
        return (
            d.getFullYear() === hoje.getFullYear() &&
            d.getMonth() === hoje.getMonth() &&
            d.getDate() === hoje.getDate()
        );
    });

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                    Serviços
                </h2>
                <div className="flex items-center gap-4">
                    <button
                        onClick={onNovo}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow"
                    >
                        Novo Serviço
                    </button>
                    <select
                        className="border bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg px-3 py-2"
                        value={filtro}
                        onChange={(e) => setFiltro(e.target.value)}
                    >
                        <option value="abertos">Abertos / Em andamento</option>
                        <option value="aberto">Abertos</option>
                        <option value="em_andamento">Em andamento</option>
                        <option value="finalizado">Finalizados</option>
                    </select>
                </div>
            </div>

            {avisos.length > 0 && (
                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-lg">
                    {avisos.map((s) => (
                        <p key={s.id}>
                            ⚠️ Atenção: a data de entrega do serviço <strong>{s.titulo}</strong> é hoje!
                        </p>
                    ))}
                </div>
            )}

            <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4">
                <table className="min-w-full">
                    <thead>
                    <tr className="bg-gray-100 dark:bg-gray-700">
                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 dark:text-gray-300">
                            Título
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 dark:text-gray-300">
                            Cliente
                        </th>
                        <th className="px-4 py-2 text-right text-xs font-semibold text-gray-600 dark:text-gray-300">
                            Valor
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 dark:text-gray-300">
                            Data Entrada
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 dark:text-gray-300">
                            Status
                        </th>
                        <th className="px-4 py-2 text-center text-xs font-semibold text-gray-600 dark:text-gray-300">
                            Ações
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {filtrados.map((s) => (
                        <tr
                            key={s.id}
                            className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                            <td className="px-4 py-3 text-gray-900 dark:text-gray-100">
                                {s.titulo}
                            </td>
                            <td className="px-4 py-3 text-gray-900 dark:text-gray-100">
                                {s.nome_cliente}
                            </td>
                            <td className="px-4 py-3 text-right text-gray-900 dark:text-gray-100">
                                R$ {s.valor.toFixed(2).replace(".", ",")}
                            </td>
                            <td className="px-4 py-3 text-gray-900 dark:text-gray-100">
                                {formatarData(s.data_entrada)}
                            </td>
                            <td className="px-4 py-3 text-gray-900 dark:text-gray-100">
                                {traduzirStatus(s.status)}
                            </td>
                            <td className="px-4 py-3 flex justify-center space-x-4">
                                <button
                                    onClick={() => onDetalhes(s)}
                                    className="text-blue-500 hover:text-blue-600"
                                    title="Detalhes"
                                >
                                    <FiEye size={20} />
                                </button>
                                <button
                                    onClick={() => onEditar(s)}
                                    className="text-yellow-400 hover:text-yellow-500"
                                    title="Editar"
                                >
                                    <FiEdit2 size={20} />
                                </button>
                                {s.status !== "finalizado" && (
                                    <button
                                        onClick={() => onFinalizar(s)}
                                        className="text-green-500 hover:text-green-600"
                                        title="Finalizar"
                                    >
                                        <FiCheckCircle size={20} />
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
