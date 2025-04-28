import {
    collection, addDoc, doc, updateDoc,
    query, limit, startAfter, getDocs, onSnapshot
} from "firebase/firestore";
import { db, auth } from "../firebase/config";
import { serverTimestamp } from "firebase/firestore";

const col = collection(db, "pedidos");

// Realtime listener
export const onPedidosChange = (cb: (docs: any[]) => void) =>
    onSnapshot(col, snap => cb(snap.docs.map(d => ({ id: d.id, ...d.data() }))));

// CRUD básico
export const addPedido = (data: Omit<any, "criado_por"|"criado_nome"|"data_criacao">) =>
    addDoc(col, {
        ...data,
        criado_por: auth.currentUser!.uid,
        criado_nome: auth.currentUser!.displayName || "Usuário",
        data_criacao: serverTimestamp(),
        status: "aberto"
    });

export const editPedido = (id: string, dados: any) =>
    updateDoc(doc(db, "pedidos", id), dados);

// Resolver pedido
export const resolverPedido = (id: string) =>
    updateDoc(doc(db, "pedidos", id), {
        status: "resolvido",
        resolvido_por: auth.currentUser!.uid,
        resolvido_nome: auth.currentUser!.displayName || "Usuário"
    });

// Cancelar pedido
export const cancelarPedido = (id: string) =>
    updateDoc(doc(db, "pedidos", id), {
        status: "cancelado"
    });

// Paginação
export const fetchPedidosPage = async (last: any) => {
    let q = query(col, limit(10));
    if (last) q = query(col, startAfter(last), limit(10));
    const snap = await getDocs(q);
    return {
        lastDoc: snap.docs[snap.docs.length - 1],
        data: snap.docs.map(d => ({ id: d.id, ...d.data() }))
    };
};
