// src/services/servicosService.ts
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
    serverTimestamp,
} from "firebase/firestore";
import { db, auth } from "src/firebase/config";
import { logActivity } from "src/services/activityLogService";

const col = collection(db, "servicos");

// Escuta em tempo real
export const onServicosChange = (cb: (docs: any[]) => void) =>
    onSnapshot(col, snap =>
        cb(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    );

// CRUD
export const addServico = async (data: any) => {
    const ref = await addDoc(col, {
        ...data,
        criado_por: auth.currentUser!.uid,
        criado_nome: auth.currentUser!.displayName || "Usuário",
        status: "aberto",
        data_entrada: serverTimestamp(),
    });
    await logActivity(
        "servico_criado",
        `Serviço “${data.titulo}” agendado.`,
        { servicoId: ref.id }
    );
    return ref;
};

export const editServico = async (id: string, data: any) => {
    await updateDoc(doc(db, "servicos", id), {
        ...data,
        updatedAt: serverTimestamp(),
    });
    await logActivity(
        "servico_editado",
        `Serviço “${data.titulo || id}” atualizado.`,
        { servicoId: id }
    );
};

export const finalizarServico = async (id: string) => {
    await updateDoc(doc(db, "servicos", id), {
        status: "finalizado",
        finalizadoEm: serverTimestamp(),
    });
    await logActivity(
        "servico_finalizado",
        `Serviço ${id} finalizado.`,
        { servicoId: id }
    );
};

// Paginação
export const fetchServicosPage = async (last: any) => {
    let q = query(col, limit(20));
    if (last) q = query(col, startAfter(last), limit(20));
    const snap = await getDocs(q);
    return {
        lastDoc: snap.docs[snap.docs.length - 1],
        data: snap.docs.map(d => ({ id: d.id, ...d.data() })),
    };
};
