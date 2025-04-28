// src/views/dashboard/TotalIncome.tsx
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { Icon } from "@iconify/react";
import { Badge } from "flowbite-react";
import { collection, getDocs, query, where, Timestamp } from "firebase/firestore";
import { db } from "src/firebase/config";
import { startOfMonth, subMonths } from "date-fns";

export default function TotalIncome() {
  const [monthlyTotals, setMonthlyTotals] = useState<number[]>([]);
  const [currentTotal, setCurrentTotal] = useState(0);

  useEffect(() => {
    (async () => {
      const data: number[] = [];
      const now = new Date();
      for (let i = 5; i >= 0; i--) {
        const start = startOfMonth(subMonths(now, i));
        const end   = startOfMonth(subMonths(now, i - 1));
        // vendas
        const vendasQ = query(
            collection(db, "vendas"),
            where("data_venda", ">=", Timestamp.fromDate(start)),
            where("data_venda", "<",  Timestamp.fromDate(end))
        );
        const vs = await getDocs(vendasQ);
        let sumV = 0;
        vs.docs.forEach(d => sumV += d.data().total || 0);
        // serviços
        const servQ = query(
            collection(db, "servicos"),
            where("finalizadoEm", ">=", Timestamp.fromDate(start)),
            where("finalizadoEm", "<",  Timestamp.fromDate(end))
        );
        const ss = await getDocs(servQ);
        let sumS = 0;
        ss.docs.forEach(d => {
          const s = d.data();
          sumS += ((s.valor || 0) - (s.custo_materiais || 0));
        });
        const total = sumV + sumS;
        data.push(total);
        if (i === 0) setCurrentTotal(total);
      }
      setMonthlyTotals(data);
    })();
  }, []);

  const chartOptions = {
    series: [{ name: "Earnings", data: monthlyTotals }],
    chart: {
      id: "total-income",
      type: "area",
      height: 60,
      sparkline: { enabled: true },
      fontFamily: "inherit",
      foreColor: "#adb0bb",
    },
    stroke: { curve: "smooth", width: 2 },
    fill: {
      type: "gradient",
      gradient: { shadeIntensity: 0, inverseColors: false, opacityFrom: 0, opacityTo: 0 },
    },
    markers: { size: 0 },
    tooltip: {
      theme: "dark",
      fixed: { enabled: true, position: "right" },
      x: { show: false },
    },
  };

  return (
      <div className="bg-white rounded-xl shadow-md p-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-lighterror text-error p-3 rounded-md">
            <Icon icon="solar:cash-linear" height={24} />
          </div>
          <p className="text-lg font-semibold text-dark">Total de Entradas</p>
        </div>
        <div className="flex">
          <div className="flex-1">
            <p className="text-xl text-dark font-medium mb-2">
              R$ {currentTotal.toFixed(2).replace(".", ",")}
            </p>
            <Badge className="bg-lightsuccess text-success">
              {monthlyTotals.length
                  ? ((currentTotal / Math.max(1, monthlyTotals[monthlyTotals.length - 2])) * 100 - 100).toFixed(1) + "%"
                  : "+0%"}
            </Badge>
          </div>
          <div className="rounded-bars flex-1 md:ps-7">
            <Chart
                options={chartOptions}
                series={chartOptions.series}
                type="area"
                height={60}
                width="100%"
            />
          </div>
        </div>
      </div>
  );
}
