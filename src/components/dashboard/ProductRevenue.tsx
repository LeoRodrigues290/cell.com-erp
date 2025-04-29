// src/views/dashboard/ProductRevenue.tsx
import { useEffect, useState } from "react";
import { Badge, Table } from "flowbite-react";
import { collection, getDoc, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "src/firebase/config";
import SimpleBar from "simplebar-react";

interface Item {
  id: string;
  name: string;
  count: number;
  img?: string;
}

export default function ProductRevenue() {
  const [topProducts, setTopProducts] = useState<Item[]>([]);
  const [topServices, setTopServices] = useState<Item[]>([]);

  useEffect(() => {
    (async () => {
      // produtos mais vendidos
      const vendasSnap = await getDocs(collection(db, "vendas"));
      const prodCounts: Record<string, number> = {};
      vendasSnap.docs.forEach(d => {
        const dta = d.data();
        prodCounts[dta.produto_id] = (prodCounts[dta.produto_id] || 0) + (dta.quantidade || 1);
      });
      const prods: Item[] = [];
      for (const [pid, cnt] of Object.entries(prodCounts)) {
        const docP = await getDoc(collection(db, "produtos").doc(pid));
        if (docP.exists()) {
          const p = docP.data();
          prods.push({ id: pid, name: p.titulo, img: p.imagem, count: cnt });
        }
      }
      setTopProducts(prods.sort((a,b)=>b.count - a.count).slice(0,4));

      // serviços mais realizados
      const servSnap = await getDocs(collection(db, "servicos"));
      const servCounts: Record<string, number> = {};
      servSnap.docs.forEach(d => {
        if (d.data().status === "finalizado") {
          servCounts[d.id] = (servCounts[d.id] || 0) + 1;
        }
      });
      const servs: Item[] = [];
      for (const [sid, cnt] of Object.entries(servCounts)) {
        const docS = await getDoc(collection(db, "servicos").doc(sid));
        if (docS.exists()) {
          const s = docS.data();
          servs.push({ id: sid, name: s.titulo, count: cnt });
        }
      }
      setTopServices(servs.sort((a,b)=>b.count - a.count).slice(0,4));
    })();
  }, []);

  return (
      <div className="bg-white rounded-xl shadow-md p-6 h-full">
        <h5 className="card-title mb-6">Produtos e Serviços mais vendidos</h5>
        <SimpleBar className="max-h-[450px]">
          <div className="overflow-x-auto space-y-8">
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell className="p-6">Produto</Table.HeadCell>
                <Table.HeadCell>Vendido</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y divide-border">
                {topProducts.map((item) => (
                    <Table.Row key={item.id}>
                      <Table.Cell className="whitespace-nowrap ps-6">
                        <div className="flex gap-3 items-center">
                          {item.img && <img src={item.img} alt="" className="h-[60px] w-[60px] rounded-md" />}
                          <h6 className="text-sm">{item.name}</h6>
                        </div>
                      </Table.Cell>
                      <Table.Cell>
                        <Badge>{item.count}×</Badge>
                      </Table.Cell>
                    </Table.Row>
                ))}
              </Table.Body>
            </Table>

            <Table hoverable>
              <Table.Head>
                <Table.HeadCell className="p-6">Serviço</Table.HeadCell>
                <Table.HeadCell>Realizado</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y divide-border">
                {topServices.map((item) => (
                    <Table.Row key={item.id}>
                      <Table.Cell className="whitespace-nowrap ps-6">
                        <h6 className="text-sm">{item.name}</h6>
                      </Table.Cell>
                      <Table.Cell>
                        <Badge color="indigo">{item.count}×</Badge>
                      </Table.Cell>
                    </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </SimpleBar>
      </div>
  );
}
