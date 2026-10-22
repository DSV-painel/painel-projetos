/**
 * Serviço de Autenticação e Perfis (Firebase Auth + RBAC /usuarios)
 */
import { 
  auth, 
  db, 
  isMockFirebase 
} from '../config/firebase.config.js';
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { setCurrentUser, getState } from '../store/state.js';

export const AuthService = {
  /**
   * Realiza login com e-mail e senha no Firebase Auth
   * @param {string} email 
   * @param {string} password 
   * @returns {Promise<Object>}
   */
  async login(email, password) {
    if (isMockFirebase || !auth) {
      // Simulação para ambiente local sem internet
      const mockUser = {
        uid: 'usr_demo_admin',
        email,
        nome: email.split('@')[0],
        perfil: 'admin',
        setor: 'DIST'
      };
      setCurrentUser(mockUser);
      return mockUser;
    }

    const credential = await signInWithEmailAndPassword(auth, email.trim(), password);
    const user = credential.user;
    return await this.carregarPerfilUsuario(user);
  },

  /**
   * Encerra a sessão ativa
   */
  async logout() {
    if (!isMockFirebase && auth) {
      await signOut(auth);
    }
    setCurrentUser(null);
  },

  /**
   * Busca os dados e permissões do usuário em /usuarios/{uid}
   * @param {Object} firebaseUser 
   * @returns {Promise<Object>}
   */
  async carregarPerfilUsuario(firebaseUser) {
    if (!firebaseUser) {
      setCurrentUser(null);
      return null;
    }

    let perfil = 'leitor';
    let dadosDoc = {};

    if (!isMockFirebase && db) {
      try {
        let userDocSnap = await getDoc(doc(db, 'usuarios', firebaseUser.uid));
        
        // No painel-crm original, os documentos em /usuarios são indexados pelo e-mail
        if (!userDocSnap.exists() && firebaseUser.email) {
          const emailKey = firebaseUser.email.toLowerCase().trim();
          userDocSnap = await getDoc(doc(db, 'usuarios', emailKey));
        }

        if (userDocSnap.exists()) {
          dadosDoc = userDocSnap.data();

          // Avaliação de RBAC Granular:
          const isAdminGeral = dadosDoc.admin_geral === true || 
                               dadosDoc.role === 'admin' || 
                               dadosDoc.papel === 'admin';

          const roleProjetos = dadosDoc.role_projetos;

          if (isAdminGeral || roleProjetos === 'admin') {
            perfil = 'admin';
          } else if (roleProjetos === 'editor') {
            perfil = 'editor';
          } else if (roleProjetos === 'leitor') {
            perfil = 'leitor';
          } else if (roleProjetos === 'sem_acesso') {
            perfil = 'sem_acesso';
          } else {
            // Se não tem role_projetos explicitado e não é admin geral:
            // Por segurança, fica bloqueado até o admin liberar
            perfil = 'sem_acesso';
          }
        } else {
          // Documento não existe em /usuarios
          perfil = 'sem_acesso';
        }
      } catch (err) {
        console.warn("Aviso ao carregar perfil de /usuarios:", err.message);
        // Em caso de falha de conexão com doc, mantém dados básicos
        perfil = 'leitor';
      }
    }

    // Formatação de nome com fallbacks inteligentes
    let nomeFormatado = dadosDoc.nome || dadosDoc.Nome || firebaseUser.displayName;
    if (!nomeFormatado && firebaseUser.email) {
      const emailUser = firebaseUser.email.split('@')[0];
      nomeFormatado = emailUser
        .split('.')
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ');
    }

    const usuarioFinal = {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      nome: nomeFormatado || 'Usuário',
      setor: dadosDoc.setor || dadosDoc.Setor || 'DSV',
      perfil,
      role: dadosDoc.role,
      role_crm: dadosDoc.role_crm,
      role_projetos: dadosDoc.role_projetos
    };

    setCurrentUser(usuarioFinal);
    return usuarioFinal;
  },

  /**
   * Monitora alterações no estado de autenticação do Firebase
   * @param {Function} callback 
   * @returns {Function} Unsubscribe
   */
  monitorarAutenticacao(callback) {
    if (isMockFirebase || !auth) {
      const demoUser = getState().currentUser;
      if (demoUser && callback) callback(demoUser);
      return () => {};
    }

    return onAuthStateChanged(auth, async (user) => {
      if (user) {
        const profile = await this.carregarPerfilUsuario(user);
        if (callback) callback(profile);
      } else {
        setCurrentUser(null);
        if (callback) callback(null);
      }
    });
  }
};
