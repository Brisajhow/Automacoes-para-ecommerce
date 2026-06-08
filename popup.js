async function executarArquivo(arquivo) {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true
  });

  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: [arquivo]
  });
}

document
  .getElementById('rodarCompatibilidade')
  .addEventListener('click', () => {
    executarArquivo('compatibilidade.js');
  });

document
  .getElementById('rodarPosicoes')
  .addEventListener('click', () => {
    executarArquivo('posicoes.js');
  });