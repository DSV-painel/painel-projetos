/**
 * Utilitário de Fuzzy Matching e Comparação Fonética / Aproximada de Nomes
 * Utilizado para identificação e deduplicação de contatos institucionais
 */

const STOP_WORDS = new Set(['de', 'da', 'do', 'dos', 'das', 'e']);

/**
 * Normaliza uma string para comparação (sem acentos, minúsculas, sem pontuação ou stop-words)
 * @param {string} str 
 * @returns {string}
 */
export function normalizarTextoParaComparacao(str) {
  if (!str || typeof str !== 'string') return '';
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove acentos
    .replace(/[^a-z0-9\s]/g, ' ') // substitui pontuação por espaço
    .split(/\s+/)
    .filter(token => token && !STOP_WORDS.has(token))
    .join(' ')
    .trim();
}

/**
 * Calcula a distância de edição de Levenshtein entre duas strings
 * @param {string} a 
 * @param {string} b 
 * @returns {number}
 */
export function calcularDistanciaLevenshtein(a, b) {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;

  const matrix = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0));

  for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
  for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,      // deleção
        matrix[i][j - 1] + 1,      // inserção
        matrix[i - 1][j - 1] + cost // substituição
      );
    }
  }

  return matrix[a.length][b.length];
}

/**
 * Calcula a similaridade normalizada entre duas strings (0.0 a 1.0)
 * @param {string} a 
 * @param {string} b 
 * @returns {number}
 */
export function calcularSimilaridadeLevenshtein(a, b) {
  const normA = normalizarTextoParaComparacao(a);
  const normB = normalizarTextoParaComparacao(b);

  if (normA === normB) return 1.0;
  if (!normA.length || !normB.length) return 0.0;

  const maxLen = Math.max(normA.length, normB.length);
  const distance = calcularDistanciaLevenshtein(normA, normB);
  return Math.max(0, 1 - distance / maxLen);
}

/**
 * Compara dois nomes considerando similaridade de edição e sobreposição de tokens/sobrenomes
 * Suporta nomes abreviados, nomes compostos e variações de grafia
 * @param {string} nomeA 
 * @param {string} nomeB 
 * @returns {number} Score de 0.0 a 1.0
 */
export function compararNomesFuzzy(nomeA, nomeB) {
  const normA = normalizarTextoParaComparacao(nomeA);
  const normB = normalizarTextoParaComparacao(nomeB);

  if (!normA || !normB) return 0.0;
  if (normA === normB) return 1.0;

  const globalScore = calcularSimilaridadeLevenshtein(normA, normB);

  const tokensA = normA.split(' ');
  const tokensB = normB.split(' ');

  // Verifica se o primeiro nome e o último sobrenome coincidem
  const primeiroNomeIgual = tokensA[0] === tokensB[0];
  const ultimoNomeIgual = tokensA[tokensA.length - 1] === tokensB[tokensB.length - 1];

  let matchesTokens = 0;
  tokensA.forEach(tA => {
    if (tokensB.some(tB => {
      if (tA === tB) return true;
      if ((tA.length === 1 || tB.length === 1) && tA[0] === tB[0]) return true;
      return calcularSimilaridadeLevenshtein(tA, tB) >= 0.85;
    })) {
      matchesTokens++;
    }
  });

  const tokenCoverage = (2 * matchesTokens) / (tokensA.length + tokensB.length);

  let finalScore = Math.max(globalScore, tokenCoverage);

  // Bonificação quando primeiro e último nome são idênticos mesmo com sobrenome do meio abreviado
  if (primeiroNomeIgual && ultimoNomeIgual) {
    finalScore = Math.max(finalScore, 0.88);
  }

  return Math.min(1.0, Number(finalScore.toFixed(3)));
}
