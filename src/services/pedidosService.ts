import {
    collection,
    addDoc,
    updateDoc,
    doc,
    onSnapshot,
    serverTimestamp,
} from "firebase/firestore";
import { db, auth } from "src/firebase/config";

const col = collection(db, "pedidos");

export const onPedidosChange = (cb: (docs: any[]) => void) =>
    onSnapshot(col, (snap) => cb(snap.docs.map((d) => ({ id: d.id, ...d.data() }))));

export const addPedido = (descricao: string) =>
    addDoc(col, {
        descricao,
        criado_por: auth.currentUser!.uid,
        criado_nome: auth.currentUser!.displayName || "Usuário",
        status: "aberto",
        data_criacao: serverTimestamp(),
    });

export const resolverPedido = (id: string) =>
    updateDoc(doc(db, "pedidos", id), {
        status: "resolvido",
        resolvido_por: auth.currentUser!.uid,
        resolvido_nome: auth.currentUser!.displayName || "Usuário",
    });

export const cancelarPedido = (id: string) =>
    updateDoc(doc(db, "pedidos", id), {
        status: "cancelado",
        resolvido_por: auth.currentUser!.uid,
        resolvido_nome: auth.currentUser!.displayName || "Usuário",
    });
