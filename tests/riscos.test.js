import { describe, it, expect } from 'vitest';
import { calcularClassificacaoRisco } from '../src/services/riscos.service.js';
import { canConfigureDist, setCurrentUser } from '../src/store/state.js';

describe('Metodologia da Matriz de Riscos (Probabilidade x Impacto)', () => {
  it('deve classificar como "Baixo" pontuações 1 e 2', () => {
    // 1 x 1 = 1
    const r1 = calcularClassificacaoRisco(1, 1);
    expect(r1.pontuacao).toBe(1);
    expect(r1.classificacao).toBe('Baixo');

    // 1 x 2 = 2
    const r2 = calcularClassificacaoRisco(1, 2);
    expect(r2.pontuacao).toBe(2);
    expect(r2.classificacao).toBe('Baixo');

    // 2 x 1 = 2
    const r3 = calcularClassificacaoRisco(2, 1);
    expect(r3.pontuacao).toBe(2);
    expect(r3.classificacao).toBe('Baixo');
  });

  it('deve classificar como "Moderado" pontuações 3 e 4', () => {
    // 1 x 3 = 3
    const r1 = calcularClassificacaoRisco(1, 3);
    expect(r1.pontuacao).toBe(3);
    expect(r1.classificacao).toBe('Moderado');

    // 3 x 1 = 3
    const r2 = calcularClassificacaoRisco(3, 1);
    expect(r2.pontuacao).toBe(3);
    expect(r2.classificacao).toBe('Moderado');

    // 2 x 2 = 4
    const r3 = calcularClassificacaoRisco(2, 2);
    expect(r3.pontuacao).toBe(4);
    expect(r3.classificacao).toBe('Moderado');
  });

  it('deve classificar como "Alto" pontuações 6 e 9', () => {
    // 2 x 3 = 6
    const r1 = calcularClassificacaoRisco(2, 3);
    expect(r1.pontuacao).toBe(6);
    expect(r1.classificacao).toBe('Alto');

    // 3 x 2 = 6
    const r2 = calcularClassificacaoRisco(3, 2);
    expect(r2.pontuacao).toBe(6);
    expect(r2.classificacao).toBe('Alto');

    // 3 x 3 = 9
    const r3 = calcularClassificacaoRisco(3, 3);
    expect(r3.pontuacao).toBe(9);
    expect(r3.classificacao).toBe('Alto');
  });

  it('deve normalizar valores fora da escala 1 a 3', () => {
    const rMin = calcularClassificacaoRisco(0, -5);
    expect(rMin.p).toBe(1);
    expect(rMin.i).toBe(1);
    expect(rMin.pontuacao).toBe(1);

    const rMax = calcularClassificacaoRisco(10, 5);
    expect(rMax.p).toBe(3);
    expect(rMax.i).toBe(3);
    expect(rMax.pontuacao).toBe(9);
  });
});

describe('Regras de Acesso e Configuração do Módulo DIST', () => {
  it('deve autorizar gestor_dist e admin a configurar o módulo DIST', () => {
    setCurrentUser({ uid: '1', nome: 'Gestor', perfil: 'gestor_dist' });
    expect(canConfigureDist()).toBe(true);

    setCurrentUser({ uid: '2', nome: 'Admin', perfil: 'admin' });
    expect(canConfigureDist()).toBe(true);
  });

  it('deve recusar permissão para editor e leitor alterarem o módulo DIST', () => {
    setCurrentUser({ uid: '3', nome: 'Editor', perfil: 'editor' });
    expect(canConfigureDist()).toBe(false);

    setCurrentUser({ uid: '4', nome: 'Leitor', perfil: 'leitor' });
    expect(canConfigureDist()).toBe(false);
  });
});
