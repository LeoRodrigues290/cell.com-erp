import {
    collection,
    addDoc,
    query,
    where,
    orderBy,
    onSnapshot,
    serverTimestamp,
    Timestamp,
    DocumentData,
} from "firebase/firestore";
import { db, auth } from "../firebase/config";

// Grava um evento de atividade
export const logActivity = async (
    type: string,
    description: string,
    metadata: Record<string, any> = {}
) => {
    await addDoc(collection(db, "activityLogs"), {
        type,
        description,
        metadata,
        userId: auth.currentUser!.uid,
        userName: auth.currentUser!.displayName || "Usuário",
        timestamp: serverTimestamp(),
    });
};

// Listener para os logs de HOJE
export const onTodayActivities = (cb: (logs: DocumentData[]) => void) => {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setDate(end.getDate() + 1);

    const q = query(
        collection(db, "activityLogs"),
        where("timestamp", ">=", Timestamp.fromDate(start)),
        where("timestamp", "<", Timestamp.fromDate(end)),
        orderBy("timestamp", "desc")
    );
    return onSnapshot(q, snapshot =>
        cb(snapshot.docs.map(d => ({ id: d.id, ...d.data() })))
    );
};
