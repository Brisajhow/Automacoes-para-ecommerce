(async () => {
  const CONFIG = {
    tentativas: 3
  };

  const esperar = ms => new Promise(r => setTimeout(r, ms));

  const normalizar = txt =>
    String(txt || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, ' ')
      .trim();

  function log(msg) {
    console.log(`✅ ML Posições: ${msg}`);
  }

  function warn(msg) {
    console.warn(`⚠️ ML Posições: ${msg}`);
  }

  function detectarPosicaoTitulo(titulo) {
    const t = normalizar(titulo);

    return {
      esquerda: /\besq\b|esquerdo|esquerda|motorista/.test(t),
      direita: /\bdir\b|direito|direita|passageiro/.test(t),
      dianteira: /dianteiro|dianteira|frontal|frente/.test(t),
      traseira: /traseiro|traseira|tras/.test(t)
    };
  }

  function selecionarPosicaoPorTitulo(titulo) {
    const alvo = detectarPosicaoTitulo(titulo);

    const opcoes = [...document.querySelectorAll('.andes-checkbox__label-text')]
      .map(label => {
        const texto = label.innerText.trim();
        const n = normalizar(texto);

        let pontos = 0;

        if (alvo.esquerda && (n.includes('esquerda') || n.includes('motorista'))) pontos += 10;
        if (alvo.direita && (n.includes('direita') || n.includes('passageiro'))) pontos += 10;
        if (alvo.dianteira && (n.includes('dianteira') || n.includes('dianteiro') || n.includes('frente'))) pontos += 5;
        if (alvo.traseira && (n.includes('traseira') || n.includes('traseiro') || n.includes('tras'))) pontos += 5;

        return { label, texto, pontos };
      })
      .filter(o => o.pontos > 0)
      .sort((a, b) => b.pontos - a.pontos);

    if (!opcoes.length) {
      warn('Nenhuma posição compatível encontrada pelo título.');
      return false;
    }

    const melhor = opcoes[0];
    const checkbox = melhor.label.closest('label')?.querySelector('input[type="checkbox"]');

    if (!checkbox) {
      warn(`Checkbox da posição não encontrado: ${melhor.texto}`);
      return false;
    }

    if (!checkbox.checked) checkbox.click();

    log(`Posição selecionada: ${melhor.texto}`);
    return true;
  }

  async function adicionarPosicoesPorTitulo(titulo) {
    for (let tentativa = 1; tentativa <= CONFIG.tentativas; tentativa++) {
      const botaoAbrir = [...document.querySelectorAll('button')]
        .find(btn => normalizar(btn.innerText) === 'adicionar as posicoes');

      if (!botaoAbrir) {
        warn(`Tentativa ${tentativa}: botão Adicionar as posições não encontrado.`);
        await esperar(1000);
        continue;
      }

      botaoAbrir.click();
      log('Janela de posições aberta.');
      await esperar(1500);

      const selecionou = selecionarPosicaoPorTitulo(titulo);

      if (!selecionou) {
        warn('Nenhuma posição foi selecionada.');
        return false;
      }

      await esperar(800);

      const botaoAdicionar = [...document.querySelectorAll('button')]
        .find(btn => normalizar(btn.innerText) === 'adicionar');

      if (!botaoAdicionar) {
        warn('Botão Adicionar da posição não encontrado.');
        return false;
      }

      botaoAdicionar.click();
      log('Posição adicionada.');
      await esperar(2500);

      return true;
    }

    warn('Não foi possível abrir a janela de posições.');
    return false;
  }

  console.clear();

  const titulo = document.querySelector('.headline__subtitle')?.innerText || '';

  console.log('Título:', titulo);

  if (!titulo) {
    warn('Título não encontrado.');
    return;
  }

  await esperar(1000);
  await adicionarPosicoesPorTitulo(titulo);
})();
