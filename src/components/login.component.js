/**
 * Componente de Tela de Login Institucional (Design System Detran / DSV)
 * Baseado em refs/login_page.png e painel-crm
 */
import { AuthService } from '../services/auth.service.js';
import { showToast } from './toast.component.js';
import logoHorizontal from '../../data/refs/logo_horizontal.png';

export function renderLogin(container, onLoginSuccess) {
  container.innerHTML = `
    <div class="login-view-container">
      <div class="login-box">
        <img src="${logoHorizontal}" alt="Detran.SP" class="login-logo" onerror="this.style.display='none'">
        <h2>Painel de Projetos</h2>
        <p class="login-subtitle">Insira suas credenciais para acessar o painel.</p>
        
        <form id="login-form">
          <div class="input-group">
            <label for="login-email">E-MAIL</label>
            <input 
              type="email" 
              id="login-email" 
              placeholder="seu.email@detran.sp.gov.br" 
              required 
              autocomplete="email"
              autofocus
            >
          </div>

          <div class="input-group">
            <label for="login-password">SENHA</label>
            <input 
              type="password" 
              id="login-password" 
              placeholder="••••••••" 
              required 
              autocomplete="current-password"
            >
          </div>

          <button type="submit" id="btn-login-submit">Entrar no Painel</button>
        </form>

        <div id="login-error" class="login-error-msg" style="display: none;"></div>
      </div>
    </div>
  `;

  const form = container.querySelector('#login-form');
  const btnSubmit = container.querySelector('#btn-login-submit');
  const errorEl = container.querySelector('#login-error');

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = container.querySelector('#login-email').value.trim();
    const senha = container.querySelector('#login-password').value;

    if (!email || !senha) return;

    btnSubmit.disabled = true;
    btnSubmit.textContent = 'Autenticando...';
    errorEl.style.display = 'none';

    try {
      const user = await AuthService.login(email, senha);

      if (user.perfil === 'sem_acesso') {
        errorEl.textContent = 'Acesso não autorizado: seu usuário não possui permissão ativa para o Painel de Projetos (role_projetos). Entre em contato com a administração.';
        errorEl.style.display = 'block';
        btnSubmit.disabled = false;
        btnSubmit.textContent = 'Entrar no Painel';
        return;
      }

      showToast(`Bem-vindo, ${user.nome}!`, 'success');
      if (onLoginSuccess) onLoginSuccess(user);
    } catch (err) {
      let msg = 'Erro ao realizar login. Verifique suas credenciais.';
      if (
        err.code === 'auth/invalid-credential' || 
        err.code === 'auth/wrong-password' || 
        err.code === 'auth/user-not-found'
      ) {
        msg = 'E-mail ou senha incorretos.';
      } else if (err.code === 'auth/too-many-requests') {
        msg = 'Muitas tentativas sem sucesso. Tente novamente em alguns minutos.';
      } else if (err.message) {
        msg = err.message;
      }

      errorEl.textContent = msg;
      errorEl.style.display = 'block';
    } finally {
      btnSubmit.disabled = false;
      btnSubmit.textContent = 'Entrar no Painel';
    }
  });
}
