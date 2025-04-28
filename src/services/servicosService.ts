import {
    collection,
    addDoc,
    doc,
    updateDoc,
    getDocs,
    query,
    limit,
    startAfter,
    onSnapshot,
} from "firebase/firestore";
import { db, auth } from "../firebase/config";

const col = collection(db, "servicos");

// Escuta em tempo real
export const onServicosChange = (cb: (docs: any[]) => void) =>
    onSnapshot(col, snap => cb(snap.docs.map(d => ({ id: d.id, ...d.data() }))));

// CRUD
export const addServico = (data: any) =>
    addDoc(col, {
        ...data,
        criado_por: auth.currentUser!.uid,
        criado_nome: auth.currentUser!.displayName || "Usuário",
        status: "aberto",
        data_entrada: new Date(),
    });

export const editServico = (id: string, data: any) =>
    updateDoc(doc(db, "servicos", id), data);

export const finalizarServico = (id: string) =>
    updateDoc(doc(db, "servicos", id), { status: "finalizado" });

// Paginação
export const fetchServicosPage = async (last: any) => {
    let q = query(col, limit(20));
    if (last) q = query(col, startAfter(last), limit(20));
    const snap = await getDocs(q);
    return {
        lastDoc: snap.docs[snap.docs.length - 1],
        data: snap.docs.map(d => ({ id: d.id, ...d.data() }))
    };
};
