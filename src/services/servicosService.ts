import {
    collection, addDoc, doc, updateDoc, runTransaction,
    query, limit, startAfter, getDocs, onSnapshot
} from "firebase/firestore";
import { db, auth } from "../firebase/config";

const col = collection(db, "servicos");

// Realtime listener
export const onServicosChange = (cb: (docs: any[]) => void) =>
    onSnapshot(col, snap => cb(snap.docs.map(d => ({ id: d.id, ...d.data() }))));

// CRUD básico
export const addServico = (data: Omit<any, "criado_por"|"criado_nome">) =>
    addDoc(col, {
        ...data,
        criado_por: auth.currentUser!.uid,
        criado_nome: auth.currentUser!.displayName || "Usuário"
    });

export const editServico = (id: string, dados: any) =>
    updateDoc(doc(db, "servicos", id), dados);

// Marcar serviço como entregue usando transação
export const finalizarServico = (id: string) =>
    runTransaction(db, async tx => {
        const ref = doc(db, "servicos", id);
        const snap = await tx.get(ref);
        if (!snap.exists()) throw new Error("Serviço não encontrado");
        tx.update(ref, { data_entrega: new Date() });
    });

// Paginação
export const fetchServicosPage = async (last: any) => {
    let q = query(col, limit(10));
    if (last) q = query(col, startAfter(last), limit(10));
    const snap = await getDocs(q);
    return {
        lastDoc: snap.docs[snap.docs.length - 1],
        data: snap.docs.map(d => ({ id: d.id, ...d.data() }))
    };
};
