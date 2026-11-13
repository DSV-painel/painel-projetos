/**
 * Utilitário de exportação para CSV compatível com Excel (UTF-8 com BOM)
 * Segue o padrão de download de planilhas adotado no painel-crm
 */
export function exportarParaCSV(dados = [], colunas = [], nomeArquivo = 'exportacao.csv') {
  if (!Array.isArray(dados) || dados.length === 0) {
    alert('Nenhum registro para exportar.');
    return;
  }

  const headers = colunas.length > 0 
    ? colunas 
    : Object.keys(dados[0]).map(key => ({ key, label: key }));

  const cabecalhoLinha = headers.map(h => `"${String(h.label || h.key).replace(/"/g, '""')}"`).join(';');

  const linhas = dados.map(item => {
    return headers.map(h => {
      let val = item[h.key];
      if (val === null || val === undefined) val = '';
      if (typeof val === 'object') {
        if (Array.isArray(val)) val = val.join(', ');
        else if (val.nome) val = val.nome;
        else val = JSON.stringify(val);
      }
      val = String(val).replace(/"/g, '""');
      return `"${val}"`;
    }).join(';');
  });

  const csvContent = '\uFEFF' + [cabecalhoLinha, ...linhas].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', nomeArquivo.endsWith('.csv') ? nomeArquivo : `${nomeArquivo}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
