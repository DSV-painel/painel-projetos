/**
 * Catálogo Institucional de Áreas do Detran / DSV
 * Conforme alinhamento: utilizando dados mockados flexíveis e centralizados
 */

export const DEFAULT_AREAS_INSTITUCIONAIS = [
  'DIST - Divisão de Integração Setorial',
  'DSV - Diretoria de Segurança Veicular',
  'CGIT - Coordenação Geral de Infraestrutura e Tecnologia',
  'CGEST - Coordenação Geral de Estratégia',
  'DTI - Diretoria de Tecnologia da Informação',
  'COORD - Coordenadorias Regionais',
  'Presidência / Gabinete'
];

let areasCache = [...DEFAULT_AREAS_INSTITUCIONAIS];

/**
 * Retorna a lista institucional de áreas
 * @returns {string[]}
 */
export function getAreasInstitucionais() {
  return [...areasCache];
}

/**
 * Retorna a lista de áreas para cadastro de riscos, incluindo "Compartilhada / interáreas"
 * Conforme item 5 do documento de regras de negócio
 * @returns {string[]}
 */
export function getAreasRiscos() {
  const lista = [...areasCache];
  if (!lista.includes('Compartilhada / interáreas')) {
    lista.push('Compartilhada / interáreas');
  }
  return lista;
}

/**
 * Adiciona uma nova área institucional à lista
 * @param {string} novaArea 
 */
export function adicionarAreaInstitucional(novaArea) {
  const areaTrim = novaArea?.trim();
  if (areaTrim && !areasCache.includes(areaTrim)) {
    areasCache.push(areaTrim);
    return true;
  }
  return false;
}
