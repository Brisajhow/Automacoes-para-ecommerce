(async () => {
const CONFIG = {
  salvarAutomatico: true,
  tentativas: 3
};

  const esperar = ms => new Promise(r => setTimeout(r, ms));

  const setter = Object.getOwnPropertyDescriptor(
    HTMLInputElement.prototype,
    'value'
  ).set;

  const normalizar = txt =>
    String(txt || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, ' ')
      .trim();

  const limparComparacao = txt =>
    normalizar(txt)
      .replace(/&/g, ' ')
      .replace(/[^a-z0-9]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

  function log(msg) {
    console.log(`✅ ML: ${msg}`);
  }

  function warn(msg) {
    console.warn(`⚠️ ML: ${msg}`);
  }

  const marcas = [
    'Mercedes-Benz', 'Volkswagen', 'Chevrolet', 'Mitsubishi',
    'Citroën', 'Citroen', 'Hyundai', 'Renault', 'Peugeot',
    'Toyota', 'Honda', 'Nissan', 'BMW', 'Fiat', 'Ford', 'Jeep',
    'GM', 'VW', 'Audi', 'Kia', 'Lifan', 'Chery', 'JAC', 'Chrysler'
  ];

  const aliasesMarca = {
    'GM': 'Chevrolet',
    'VW': 'Volkswagen',
    'Citroen': 'Citroën'
  };

  const aliasesModeloPremium = {
    '116': 'Série 1', '118': 'Série 1', '120': 'Série 1', '125': 'Série 1', '128': 'Série 1', '130': 'Série 1', '135': 'Série 1', '140': 'Série 1',
    '316': 'Série 3', '318': 'Série 3', '320': 'Série 3', '323': 'Série 3', '325': 'Série 3', '328': 'Série 3', '330': 'Série 3', '335': 'Série 3', '340': 'Série 3',
    '418': 'Série 4', '420': 'Série 4', '428': 'Série 4', '430': 'Série 4', '435': 'Série 4', '440': 'Série 4',
    '518': 'Série 5', '520': 'Série 5', '523': 'Série 5', '525': 'Série 5', '528': 'Série 5', '530': 'Série 5', '535': 'Série 5', '540': 'Série 5', '545': 'Série 5', '550': 'Série 5',
    '730': 'Série 7', '735': 'Série 7', '740': 'Série 7', '745': 'Série 7', '750': 'Série 7', '760': 'Série 7',

    'a160': 'Classe A', 'a180': 'Classe A', 'a200': 'Classe A', 'a250': 'Classe A', 'a35': 'Classe A', 'a45': 'Classe A',
    'b180': 'Classe B', 'b200': 'Classe B', 'b250': 'Classe B',
    'c180': 'Classe C', 'c200': 'Classe C', 'c220': 'Classe C', 'c230': 'Classe C', 'c250': 'Classe C', 'c280': 'Classe C', 'c300': 'Classe C', 'c350': 'Classe C', 'c43': 'Classe C', 'c63': 'Classe C',
    'e200': 'Classe E', 'e220': 'Classe E', 'e250': 'Classe E', 'e280': 'Classe E', 'e300': 'Classe E', 'e320': 'Classe E', 'e350': 'Classe E', 'e400': 'Classe E', 'e43': 'Classe E', 'e53': 'Classe E', 'e63': 'Classe E',
    's320': 'Classe S', 's350': 'Classe S', 's400': 'Classe S', 's450': 'Classe S', 's500': 'Classe S', 's550': 'Classe S', 's560': 'Classe S', 's600': 'Classe S', 's63': 'Classe S',
    'cla180': 'Classe CLA', 'cla200': 'Classe CLA', 'cla250': 'Classe CLA',
    'gla200': 'Classe GLA', 'gla250': 'Classe GLA',
    'glc250': 'Classe GLC', 'glc300': 'Classe GLC',
    'gle350': 'Classe GLE', 'gle400': 'Classe GLE',
    'ml350': 'Classe ML'
  };

  const mapaModeloMarca = {
    'polo tsi': 'Volkswagen',
    'virtus': 'Volkswagen',
    'jetta': 'Volkswagen',
    'golf': 'Volkswagen',
    'tiguan': 'Volkswagen',
    't-cross': 'Volkswagen',
    't cross': 'Volkswagen',
    'nivus': 'Volkswagen',
    'taos': 'Volkswagen',
    'polo': 'Volkswagen',
    'passat cc': 'Volkswagen',
    'passat': 'Volkswagen',
    'town country': 'Chrysler',
    'town & country': 'Chrysler',
    'camaro': 'Chevrolet',
    'captiva': 'Chevrolet',
    'cruze': 'Chevrolet',
    'cobalt': 'Chevrolet',
    'onix': 'Chevrolet',
    'prisma': 'Chevrolet',
    'spin': 'Chevrolet',
    'tracker': 'Chevrolet',
    's10': 'Chevrolet',
    'ix35': 'Hyundai',
    'tucson': 'Hyundai',
    'santa fe': 'Hyundai',
    'hb20': 'Hyundai',
    'creta': 'Hyundai',
    'x6': 'BMW',
    'x5': 'BMW',
    'x3': 'BMW',
    '116': 'BMW', '118': 'BMW', '120': 'BMW', '125': 'BMW', '128': 'BMW', '130': 'BMW', '135': 'BMW', '140': 'BMW',
    '316': 'BMW', '318': 'BMW', '320': 'BMW', '323': 'BMW', '325': 'BMW', '328': 'BMW', '330': 'BMW', '335': 'BMW', '340': 'BMW',
    '418': 'BMW', '420': 'BMW', '428': 'BMW', '430': 'BMW', '435': 'BMW', '440': 'BMW',
    '518': 'BMW', '520': 'BMW', '523': 'BMW', '525': 'BMW', '528': 'BMW', '530': 'BMW', '535': 'BMW', '540': 'BMW', '545': 'BMW', '550': 'BMW',
    '730': 'BMW', '735': 'BMW', '740': 'BMW', '745': 'BMW', '750': 'BMW', '760': 'BMW',

    'a160': 'Mercedes-Benz', 'a180': 'Mercedes-Benz', 'a200': 'Mercedes-Benz', 'a250': 'Mercedes-Benz', 'a35': 'Mercedes-Benz', 'a45': 'Mercedes-Benz',
    'b180': 'Mercedes-Benz', 'b200': 'Mercedes-Benz', 'b250': 'Mercedes-Benz',
    'c180': 'Mercedes-Benz', 'c200': 'Mercedes-Benz', 'c220': 'Mercedes-Benz', 'c230': 'Mercedes-Benz', 'c250': 'Mercedes-Benz', 'c280': 'Mercedes-Benz', 'c300': 'Mercedes-Benz', 'c350': 'Mercedes-Benz', 'c43': 'Mercedes-Benz', 'c63': 'Mercedes-Benz',
    'e200': 'Mercedes-Benz', 'e220': 'Mercedes-Benz', 'e250': 'Mercedes-Benz', 'e280': 'Mercedes-Benz', 'e300': 'Mercedes-Benz', 'e320': 'Mercedes-Benz', 'e350': 'Mercedes-Benz', 'e400': 'Mercedes-Benz', 'e43': 'Mercedes-Benz', 'e53': 'Mercedes-Benz', 'e63': 'Mercedes-Benz',
    's320': 'Mercedes-Benz', 's350': 'Mercedes-Benz', 's400': 'Mercedes-Benz', 's450': 'Mercedes-Benz', 's500': 'Mercedes-Benz', 's550': 'Mercedes-Benz', 's560': 'Mercedes-Benz', 's600': 'Mercedes-Benz', 's63': 'Mercedes-Benz',
    'cla180': 'Mercedes-Benz', 'cla200': 'Mercedes-Benz', 'cla250': 'Mercedes-Benz',
    'gla200': 'Mercedes-Benz', 'gla250': 'Mercedes-Benz',
    'glc250': 'Mercedes-Benz', 'glc300': 'Mercedes-Benz',
    'gle350': 'Mercedes-Benz', 'gle400': 'Mercedes-Benz',
    'ml350': 'Mercedes-Benz',

    'pulse': 'Fiat',
    'fastback': 'Fiat',
    'grand siena': 'Fiat',
    'argo': 'Fiat',
    'cronos': 'Fiat',
    'airtrek': 'Mitsubishi'
  };

  function aplicarAliasModelo(dados) {
    if (!dados.modelo) return dados;

    const modeloLimpo = limparComparacao(dados.modelo).replace(/\s+/g, '');
    const alias = aliasesModeloPremium[modeloLimpo];

    if (!alias) return dados;

    if (dados.marca === 'BMW' || dados.marca === 'Mercedes-Benz') {
      log(`Alias aplicado: ${dados.modelo} → ${alias}`);
      dados.modelo = alias;
    }

    return dados;
  }

  function extrairModeloProvavel(titulo) {
    const antesAno = titulo.split(/\b(19|20)\d{2}\b/)[0];

    return antesAno
      .replace(
        /acabamento|retrovisor|moldura|painel|instrumento|tampao|tampão|tampa|porta|capo|capô|farol|lanterna|parabarro|para-barro|grade|parachoque|para-choque|pisca|milha|luz|amortecedor|coxim|alma|suporte|radiador|condensador|ventoinha|eletroventilador|reservatorio|reservatório|sensor|chicote|modulo|módulo|borracha|macaneta|maçaneta|friso|aplique|acab|guia|defletor|spoiler|soleira|coluna|vidro|maquina|máquina|fechadura|trinco|dobradiça|dobradica|forro|capa|carenagem|traseiro|traseira|dianteiro|dianteira|esquerdo|esquerda|direito|direita|inferior|superior|interno|externo|motorista|passageiro|tsi|tfsi|fsi|turbo|flex|diesel|gasolina|alcool|álcool|hibrido|hybrid|16v|8v|12v|20v|24v|v6|v8|ex|exl|lx|lxl|xli|gli|xrs|xei|xle|se|sel|gls|gl|gt|gti|lt|ltz|ls|joy|advantage|exclusive|expression|dynamique|intense|zen|iconic/gi,
        ' '
      )
      .replace(/\b\d+(\.\d+)?\b/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function extrairDadosBase() {
    const titulo = document.querySelector('.headline__subtitle')?.innerText || '';
    const tituloNorm = normalizar(titulo);

    const marcaEncontradaNoTitulo = marcas.find(m =>
      tituloNorm.includes(normalizar(m))
    );

    let marca = marcaEncontradaNoTitulo
      ? (aliasesMarca[marcaEncontradaNoTitulo] || marcaEncontradaNoTitulo)
      : undefined;

    const anos = [...titulo.matchAll(/\b(19|20)\d{2}\b/g)]
      .map(x => Number(x[0]));

    const antesDoPrimeiroAno = titulo.split(/\b(19|20)\d{2}\b/)[0];

    let modelo = '';

    if (marcaEncontradaNoTitulo) {
      modelo = antesDoPrimeiroAno
        .split(new RegExp(marcaEncontradaNoTitulo, 'i'))[1]
        .trim();
    }

    return aplicarAliasModelo({
      titulo,
      marca,
      modelo,
      anos,
      anoInicial: Math.min(...anos),
      anoFinal: Math.max(...anos),
      marcaModeloJaSelecionados: false
    });
  }

  function aplicarBancoInterno(dados) {
    if (dados.marca && dados.modelo) return aplicarAliasModelo(dados);

    const tituloNorm = normalizar(dados.titulo);

    const modeloEncontrado = Object.keys(mapaModeloMarca)
      .sort((a, b) => b.length - a.length)
      .find(modeloMapeado => {
        const m = normalizar(modeloMapeado).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        return new RegExp(`(^|\\s)${m}(\\s|$)`).test(tituloNorm);
      });

    if (modeloEncontrado) {
      dados.marca = mapaModeloMarca[modeloEncontrado];

      dados.modelo = aliasesModeloPremium[limparComparacao(modeloEncontrado).replace(/\s+/g, '')]
        || modeloEncontrado
          .split(' ')
          .map(p => p.charAt(0).toUpperCase() + p.slice(1))
          .join(' ');

      log(`Banco interno: ${dados.modelo} → ${dados.marca}`);
    }

    return aplicarAliasModelo(dados);
  }

  function abrirDropdown(index) {
    const campos = [...document.querySelectorAll(
      '.compatibilities-filters-dropdown__placeholder'
    )];

    if (!campos[index]) {
      warn(`Dropdown ${index} não encontrado.`);
      return false;
    }

    campos[index].click();
    log(`Dropdown ${index} aberto.`);
    return true;
  }

  async function digitarBusca(texto) {
    await esperar(700);

    const input = document.querySelector('input[primary="search"]');

    if (!input) {
      warn(`Input Buscar não encontrado: ${texto}`);
      return false;
    }

    input.focus();
    setter.call(input, texto);

    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));

    log(`Digitado: ${texto}`);
    await esperar(900);
    return true;
  }

  function clicarCheckboxTextoExato(texto) {
    const alvo = normalizar(texto);

    const checkbox = [...document.querySelectorAll('input[type="checkbox"]')]
      .find(input => {
        const label = input.closest('label');
        const textoEl = normalizar(label?.innerText || input.parentElement?.innerText || '');
        return textoEl === alvo;
      });

    if (!checkbox) {
      warn(`Checkbox exato não encontrado: ${texto}`);
      return false;
    }

    if (!checkbox.checked) checkbox.click();

    log(`Selecionado: ${texto}`);
    return true;
  }

  function desmarcarCheckboxTextoExato(texto) {
    const alvo = normalizar(texto);

    const checkbox = [...document.querySelectorAll('input[type="checkbox"]')]
      .find(input => {
        const label = input.closest('label');
        const textoEl = normalizar(label?.innerText || input.parentElement?.innerText || '');
        return textoEl === alvo;
      });

    if (checkbox && checkbox.checked) {
      checkbox.click();
      log(`Desmarcado: ${texto}`);
      return true;
    }

    return false;
  }

  function encontrarModeloSemelhante(modeloProvavel) {
    const termosIgnorar = new Set([
      'tsi','tfsi','fsi','turbo','flex','diesel','gasolina','alcool','hibrido','hybrid',
      '16v','8v','12v','20v','24v','v6','v8',
      '1','10','12','13','14','15','16','18','20','22','24','25','30','32','35','40',
      '1.0','1.2','1.3','1.4','1.5','1.6','1.8','2.0','2.2','2.4','2.5','3.0','3.2','3.5','4.0',
      'ex','exl','lx','lxl','xli','gli','xrs','xei','xle','se','sel','gls','gl','gt','gti',
      'lt','ltz','ls','joy','advantage','exclusive','expression','dynamique','intense','zen','iconic'
    ]);

    const limparTokens = txt =>
      limparComparacao(txt)
        .split(' ')
        .filter(t => t && !termosIgnorar.has(t))
        .filter(t => !/^\d+(\.\d+)?$/.test(t));

    const tokensAlvo = limparTokens(modeloProvavel);

    if (!tokensAlvo.length) return null;

    const alvoLimpo = tokensAlvo.join(' ');

    const opcoes = [...document.querySelectorAll('input[type="checkbox"]')]
      .map(input => {
        const label = input.closest('label');
        const texto = label?.innerText?.trim() || '';
        const tokensOpcao = limparTokens(texto);
        const opcaoLimpa = tokensOpcao.join(' ');

        if (!texto || !tokensOpcao.length) {
          return { input, texto, score: -999 };
        }

        let score = 0;

        for (const token of tokensAlvo) {
          if (tokensOpcao.includes(token)) score += 10;
        }

        if (opcaoLimpa === alvoLimpo) score += 50;
        if (alvoLimpo.includes(opcaoLimpa)) score += 35;
        if (opcaoLimpa.includes(alvoLimpo)) score += 20;

        score -= Math.abs(tokensOpcao.length - tokensAlvo.length) * 3;

        return { input, texto, score };
      })
      .filter(o => o.texto && o.score > 0)
      .sort((a, b) => b.score - a.score || a.texto.length - b.texto.length);

    if (!opcoes.length) return null;

    log(`Melhor modelo encontrado por similaridade: ${opcoes[0].texto}`);
    return opcoes[0];
  }

  async function detectarMarcaModeloPeloML(dados) {
    if (dados.marca && dados.modelo) return aplicarAliasModelo(dados);

    const modeloProvavel = extrairModeloProvavel(dados.titulo);

    if (!modeloProvavel) {
      warn('Modelo provável não encontrado para buscar no ML.');
      return dados;
    }

    log(`Modelo provável para busca no ML: ${modeloProvavel}`);

    const modeloProvavelAlias = aliasesModeloPremium[
      limparComparacao(modeloProvavel).replace(/\s+/g, '')
    ] || modeloProvavel;

    const marcasParaTestar = [
      'Chevrolet', 'Volkswagen', 'Fiat', 'Ford', 'Hyundai', 'Toyota',
      'Honda', 'Renault', 'Mitsubishi', 'Nissan', 'Jeep', 'Peugeot',
      'Citroën', 'BMW', 'Mercedes-Benz', 'Audi', 'Kia', 'Chrysler',
      'Lifan', 'JAC', 'Chery'
    ];

    for (const marcaTeste of marcasParaTestar) {
      abrirDropdown(0);
      await esperar(500);

      await digitarBusca(marcaTeste);
      await esperar(500);

      if (!clicarCheckboxTextoExato(marcaTeste)) {
        continue;
      }

      await esperar(800);

      abrirDropdown(1);
      await esperar(500);

      await digitarBusca(modeloProvavelAlias);
      await esperar(900);

      const modeloAchado = encontrarModeloSemelhante(modeloProvavelAlias);

      if (modeloAchado) {
        if (!modeloAchado.input.checked) modeloAchado.input.click();

        dados.marca = marcaTeste;
        dados.modelo = modeloAchado.texto;
        dados.marcaModeloJaSelecionados = true;

        log(`Detectado pelo ML: ${dados.marca} → ${dados.modelo}`);
        return aplicarAliasModelo(dados);
      }

      warn(`Modelo não encontrado em ${marcaTeste}. Tentando próxima marca.`);

      abrirDropdown(0);
      await esperar(400);
      desmarcarCheckboxTextoExato(marcaTeste);
      await esperar(500);
    }

    warn('Não foi possível detectar marca/modelo pelo ML.');
    return dados;
  }

  async function extrairDadosInteligente() {
    let dados = extrairDadosBase();

    if (!dados.marca || !dados.modelo) {
      dados = await detectarMarcaModeloPeloML(dados);
    }

    if (!dados.marca || !dados.modelo) {
      dados = aplicarBancoInterno(dados);
    }

    return aplicarAliasModelo(dados);
  }

  async function buscarSelecionar(index, texto) {
    for (let t = 1; t <= CONFIG.tentativas; t++) {
      abrirDropdown(index);
      await esperar(700);

      await digitarBusca(texto);
      await esperar(900);

      if (clicarCheckboxTextoExato(texto)) return true;

      warn(`Tentativa ${t} falhou para: ${texto}`);
      await esperar(800);
    }

    return false;
  }

  async function selecionarAnos(inicio, fim) {
    abrirDropdown(2);
    await esperar(1000);

    let total = 0;

    for (let ano = inicio; ano <= fim; ano++) {
      let ok = false;

      for (let t = 1; t <= CONFIG.tentativas; t++) {
        ok = clicarCheckboxTextoExato(String(ano));

        if (ok) break;

        await esperar(500);
      }

      if (ok) total++;
    }

    log(`Anos selecionados: ${total}`);
  }

  async function clicarBuscar() {
    const botao = [...document.querySelectorAll('button')]
      .find(btn => normalizar(btn.innerText) === 'buscar');

    if (!botao) {
      warn('Botão Buscar não encontrado.');
      return false;
    }

    botao.click();
    log('Buscar clicado.');
    await esperar(1800);
    return true;
  }

  async function selecionarTodos() {
    const botaoMenu = [...document.querySelectorAll('button')]
      .find(btn => btn.getAttribute('aria-label')?.toLowerCase().includes('menu'));

    if (!botaoMenu) {
      warn('Menu de seleção não encontrado.');
      return false;
    }

    botaoMenu.click();
    await esperar(700);

    const btn = [...document.querySelectorAll('li')]
      .find(el => el.innerText?.includes('Selecionar todos'))
      ?.querySelector('button');

    if (!btn) {
      warn('Selecionar todos não encontrado.');
      return false;
    }

    btn.click();
    log('Selecionar todos clicado.');
    return true;
  }

  function salvar() {
    const btn = document.getElementById(
      'task-footer__primary-button--compatibilities_table_task'
    );

    if (!btn) {
      warn('Botão Salvar e continuar não encontrado.');
      return false;
    }

    btn.click();
    log('Salvar e continuar clicado.');
    return true;
  }

  console.clear();

  const dados = await extrairDadosInteligente();
  console.table(dados);

  if (!dados.titulo || !dados.marca || !dados.modelo || !dados.anos.length) {
    warn('Dados insuficientes. Automação interrompida.');
    return;
  }

  if (!dados.marcaModeloJaSelecionados) {
    await buscarSelecionar(0, dados.marca);
    await esperar(1000);

    await buscarSelecionar(1, dados.modelo);
    await esperar(1000);
  } else {
    log('Marca/modelo já selecionados pelo detector do ML.');
    await esperar(1000);
  }

  await selecionarAnos(dados.anoInicial, dados.anoFinal);
  await esperar(1000);

  await clicarBuscar();
  await esperar(1800);

  await selecionarTodos();
  await esperar(1000);

  if (CONFIG.salvarAutomatico) {
    salvar();
  } else {
    log('Teste finalizado. Salvar automático desligado.');
  }
})();