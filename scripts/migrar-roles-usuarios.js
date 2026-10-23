/**
 * Script de Atualização Direta de Roles no Firestore (/usuarios)
 * Utiliza as credenciais já configuradas no .env (sem solicitar login/senha)
 */
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, updateDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function migrar() {
  console.log("Conectando ao Firestore com as chaves do projeto...");
  
  try {
    const colRef = collection(db, 'usuarios');
    const snap = await getDocs(colRef);
    console.log(`Total de usuários encontrados: ${snap.size}\n`);

    if (snap.empty) {
      console.log("Nenhum documento encontrado na coleção /usuarios.");
      return;
    }

    for (const docSnap of snap.docs) {
      const data = docSnap.data();
      const currentRole = data.role || data.papel || 'leitor';

      const updates = {
        role_crm: data.role_crm || currentRole,
        role_projetos: data.role_projetos || (currentRole === 'admin' ? 'admin' : 'leitor'),
        role_eventos: data.role_eventos || (currentRole === 'admin' ? 'admin' : null)
      };

      await updateDoc(doc(db, 'usuarios', docSnap.id), updates);
      console.log(`✓ [${data.email || docSnap.id}] -> role_crm: "${updates.role_crm}", role_projetos: "${updates.role_projetos}"`);
    }

    console.log("\nAtualização de todos os usuários concluída com sucesso!");
  } catch (error) {
    console.error("Erro ao atualizar o banco de dados:", error.message);
  }
}

migrar();
