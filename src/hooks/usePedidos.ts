import { useEffect, useState } from "react";
import * as svc from "../services/pedidosService";

export function usePedidos() {
    const [pedidos, setPedidos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsub = svc.onPedidosChange(list => {
            setPedidos(list);
            setLoading(false);
        });
        return () => unsub();
    }, []);

    return { pedidos, loading };
}
