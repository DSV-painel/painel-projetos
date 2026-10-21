/**
 * Configuração e Inicialização do Firebase (Firestore & Auth)
 * Permite usar variáveis de ambiente (VITE_FIREBASE_*) ou configuração direta.
 */
import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  serverTimestamp,
  onSnapshot 
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Configurações do Firebase - substitua pelas credenciais do seu console Firebase ou defina no arquivo .env
export const firebaseConfig = {
  apiKey: import.meta.env?.VITE_FIREBASE_API_KEY || "AIzaSy_MOCK_API_KEY_PARA_DESENVOLVIMENTO",
  authDomain: import.meta.env?.VITE_FIREBASE_AUTH_DOMAIN || "detran-dist-projetos.firebaseapp.com",
  projectId: import.meta.env?.VITE_FIREBASE_PROJECT_ID || "detran-dist-projetos",
  storageBucket: import.meta.env?.VITE_FIREBASE_STORAGE_BUCKET || "detran-dist-projetos.appspot.com",
  messagingSenderId: import.meta.env?.VITE_FIREBASE_MESSAGING_SENDER_ID || "1234567890",
  appId: import.meta.env?.VITE_FIREBASE_APP_ID || "1:1234567890:web:abcdef"
};

// Verifica se as credenciais são placeholders ou reais
export const isMockFirebase = !import.meta.env?.VITE_FIREBASE_API_KEY || 
  import.meta.env?.VITE_FIREBASE_API_KEY.includes("MOCK");

let app;
let db;
let auth;

try {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  db = getFirestore(app);
  auth = getAuth(app);
} catch (error) {
  console.warn("Aviso ao inicializar Firebase:", error.message);
}

export { 
  app, 
  db, 
  auth,
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  serverTimestamp,
  onSnapshot 
};
