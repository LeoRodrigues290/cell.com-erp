import { collection, addDoc, getDocs, doc, runTransaction, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";

// Coleção de vendas
const col = collection(db, "vendas");

// Função para registrar venda e atualizar estoque com segurança
export const registrarVenda = async (dados: {
    produto_id: string;
    produto_nome: string;
    cliente: string;
    telefone: string;
    quantidade: number;
    vendido_por: string;
}) => {
    const produtoRef = doc(db, "produtos", dados.produto_id);

    await runTransaction(db, async (transaction) => {
        const produtoDoc = await transaction.get(produtoRef);

        if (!produtoDoc.exists()) {
            throw new Error("Produto não encontrado");
        }

        const estoqueAtual = produtoDoc.data()?.quantidade || 0;

        if (estoqueAtual < dados.quantidade) {
            throw new Error("Estoque insuficiente");
        }

        // Atualiza quantidade
        transaction.update(produtoRef, {
            quantidade: estoqueAtual - dados.quantidade,
        });

        // Registra a venda
        await addDoc(col, {
            ...dados,
            data_venda: serverTimestamp(),
        });
    });
};

// Função para buscar todas vendas
export const buscarVendas = async () => {
    const snap = await getDocs(col);
    return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
