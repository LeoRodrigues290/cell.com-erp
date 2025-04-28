import { useState } from "react";

export default function ServicoList({
                                        servicos,
                                        onNovo,
                                        onEditar,
                                        onDetalhes,
                                        onFinalizar,
                                    }: any) {
    const [filtro, setFiltro] = useState("abertos_em_andamento");
    const hoje = new Date();

    const formatarData = (timestamp: any) => {
        if (!timestamp) return "-";
        const date = new Date(timestamp.seconds * 1000);
        return date.toLocaleDateString("pt-BR");
    };

    const traduzirStatus = (status: string) => {
        switch (status) {
            case "aberto":
                return "Aberto";
            case "em_andamento":
                return "Em Andamento";
            case "finalizado":
                return "Finalizado";
            default:
                return status;
        }
    };

    const servicosFiltrados = servicos.filter((s: any) => {
        if (filtro === "abertos_em_andamento") return s.status !== "finalizado";
        return s.status === filtro;
    });

    // ⚠️ AVISOS: entrega hoje (compara YYYY/MM/DD local)
    const avisos = servicosFiltrados.filter((s: any) => {
        if (!s.data_entrega) return false;
        const dt = s.data_entrega.toDate();
        return (
            dt.getFullYear() === hoje.getFullYear() &&
            dt.getMonth() === hoje.getMonth() &&
            dt.getDate() === hoje.getDate()
        );
    });

    return (
        <>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Serviços</h1>
                <div className="flex gap-4">
                    <button
                        onClick={onNovo}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                        Novo Serviço
                    </button>
                    <select
                        className="border rounded p-2"
                        value={filtro}
                        onChange={e => setFiltro(e.target.value)}
                    >
                        <option value="abertos_em_andamento">Abertos / Em andamento</option>
                        <option value="aberto">Abertos</option>
                        <option value="em_andamento">Em andamento</option>
                        <option value="finalizado">Finalizados</option>
                    </select>
                </div>
            </div>

            {avisos.length > 0 && (
                <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 rounded mb-4">
                    {avisos.map((s: any) => (
                        <p key={s.id}>
                            ⚠️ Atenção: a data de entrega do serviço <strong>{s.titulo}</strong> é
                            hoje! Finalize assim que possível.
                        </p>
                    ))}
                </div>
            )}

            <div className="bg-white p-4 rounded shadow-md overflow-x-auto">
                <table className="min-w-full text-sm text-gray-700">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="py-2 px-4 text-left w-[30%]">Título</th>
                        <th className="py-2 px-4 text-left">Cliente</th>
                        <th className="py-2 px-4 text-left">Valor</th>
                        <th className="py-2 px-4 text-left">Data Entrada</th>
                        <th className="py-2 px-4 text-left">Status</th>
                        <th className="py-2 px-4 text-center">Ações</th>
                    </tr>
                    </thead>
                    <tbody>
                    {servicosFiltrados.map((s: any) => (
                        <tr key={s.id} className="border-b">
                            <td className="py-2 px-4">{s.titulo}</td>
                            <td className="py-2 px-4">{s.nome_cliente}</td>
                            <td className="py-2 px-4">R$ {s.valor}</td>
                            <td className="py-2 px-4">{formatarData(s.data_entrada)}</td>
                            <td className="py-2 px-4">{traduzirStatus(s.status)}</td>
                            <td className="py-2 px-4 flex justify-center gap-2">
                                <button onClick={() => onDetalhes(s)}>👁</button>
                                <button onClick={() => onEditar(s)}>✏️</button>
                                {s.status !== "finalizado" && (
                                    <button onClick={() => onFinalizar(s)}>✔️</button>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
