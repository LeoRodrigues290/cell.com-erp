// src/views/dashboard/DailyActivity.tsx
import { useEffect, useState } from "react";
import { onTodayActivities } from "src/services/activityLogService";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

const tipoCor: Record<string, string> = {
  pedido_criado:     "bg-primary",
  pedido_resolvido:  "bg-success",
  pedido_cancelado:  "bg-error",
  produto_criado:    "bg-info",
  produto_editado:   "bg-warning",
  produto_vendido:   "bg-secondary",
  servico_criado:    "bg-indigo-500",
  servico_editado:   "bg-indigo-300",
  servico_finalizado:"bg-green-700",
  venda_registrada:  "bg-pink-500",
};

export default function DailyActivity() {
  const [atividades, setAtividades] = useState<any[]>([]);

  useEffect(() => {
    const unsub = onTodayActivities(setAtividades);
    return () => unsub();
  }, []);

  return (
      <div className="rounded-xl shadow-md bg-white p-6 w-full">
        <h5 className="card-title mb-6">Atividades Diárias</h5>
        <ul className="flex flex-col space-y-4">
          {atividades.map((a) => {
            const dt = (a.timestamp as any).toDate();
            return (
                <li key={a.id}>
                  <div className="flex gap-4 min-h-16">
                    <div>
                      <p>{format(dt, "HH:mm", { locale: ptBR })}</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className={`rounded-full ${tipoCor[a.type] || "bg-gray-400"} p-1.5 w-fit`}></div>
                      <div className="flex-1 w-px bg-border"></div>
                    </div>
                    <div>
                      <p className="text-dark">{a.description}</p>
                    </div>
                  </div>
                </li>
            );
          })}
        </ul>
      </div>
  );
}
