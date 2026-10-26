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

  function formatarMarca(marca) {
    const chave = limparComparacao(marca);

    const mapa = {
      'gm': 'Chevrolet',
      'vw': 'Volkswagen',
      'volkswagen': 'Volkswagen',
      'chevrolet': 'Chevrolet',
      'mitsubishi': 'Mitsubishi',
      'citroen': 'Citroën',
      'citroën': 'Citroën',
      'hyundai': 'Hyundai',
      'renault': 'Renault',
      'peugeot': 'Peugeot',
      'toyota': 'Toyota',
      'honda': 'Honda',
      'nissan': 'Nissan',
      'bmw': 'BMW',
      'fiat': 'Fiat',
      'ford': 'Ford',
      'jeep': 'Jeep',
      'audi': 'Audi',
      'kia': 'Kia',
      'lifan': 'Lifan',
      'chery': 'Chery',
      'jac': 'JAC',
      'chrysler': 'Chrysler',
      'dodge': 'Dodge',
      'suzuki': 'Suzuki',
      'land rover': 'Land Rover',
      'mercedes benz': 'Mercedes-Benz',
      'mercedes-benz': 'Mercedes-Benz'
    };

    return mapa[chave] || marca;
  }

  function formatarModelo(modelo) {
    const chave = limparComparacao(modelo);

    const mapa = {
      'hrv': 'HR-V',
      'hr v': 'HR-V',
      'hr-v': 'HR-V',
      'crv': 'CR-V',
      'cr v': 'CR-V',
      'cr-v': 'CR-V',
      'Wrv': 'WR-v',
    


      't cross': 'T-Cross',
      't-cross': 'T-Cross',
      'tcross': 'T-Cross',
      'tcros': 'T-Cross',
      't cros': 'T-Cross',

      'c3': 'C3',
      'c4': 'C4',
      'c4 pallas': 'C4 Pallas',
      'c4 cactus': 'C4 Cactus',
      'ds3': 'DS3',

      'ix35': 'ix35',
      'hb20': 'HB20',
      'i30': 'i30',

      'x1': 'X1',
      'x3': 'X3',
      'x5': 'X5',
      'x6': 'X6',
      'x60': 'X60',

      's10': 'S10',
      'sw4': 'SW4',
      'rav4': 'RAV4',
      'l200': 'L200',
      'tr4': 'TR4',
      'pajero tr4': 'Pajero TR4',
      '300c': '300C',

      'passat cc': 'Passat CC',
      'grand siena': 'Grand Siena',
      'santa fe': 'Santa Fe',
      'grand vitara': 'Grand Vitara',
      'town country': 'Town & Country',
      'town & country': 'Town & Country',

      'range rover': 'Range Rover',
      'range rover sport': 'Range Rover Sport',
      'discovery': 'Discovery',
      'discovery 4': 'Discovery 4',
      'freelander 2': 'Freelander 2',

      'journey': 'Journey',
      'fiesta': 'Fiesta',
      'scenic': 'Scenic',
      'fusion': 'Fusion',
      'kicks': 'Kicks',
      'march': 'March',

      'serie 1': 'Serie 1',
      'serie 3': 'Serie 3',
      'serie 4': 'Serie 4',
      'serie 5': 'Serie 5',
      'serie 7': 'Serie 7',
      'serie 1': 'Serie 1',
      'serie 3': 'Serie 3',
      'serie 4': 'Serie 4',
      'serie 5': 'Serie 5',
      'série 7': 'Serie 7',

      'classe a': 'Classe A',
      'classe b': 'Classe B',
      'classe c': 'Classe C',
      'classe e': 'Classe E',
      'classe s': 'Classe S',
      'classe cla': 'Classe CLA',
      'classe gla': 'Classe GLA',
      'classe glc': 'Classe GLC',
      'classe gle': 'Classe GLE',
      'classe ml': 'Classe ML'
    };

    if (mapa[chave]) return mapa[chave];

    return String(modelo || '')
      .split(' ')
      .filter(Boolean)
      .map(p => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase())
      .join(' ');
  }

  const marcas = [
    'Mercedes-Benz', 'Suzuki', 'Volkswagen', 'Chevrolet', 'Mitsubishi',
    'Citroën', 'Citroen', 'Hyundai', 'Renault', 'Peugeot',
    'Toyota', 'Honda', 'Nissan', 'BMW', 'Fiat', 'Ford', 'Jeep',
    'GM', 'VW', 'Audi', 'Kia', 'Lifan', 'Chery', 'JAC', 'Chrysler',
    'Dodge', 'Land Rover','volvo',
  ];

  const aliasesMarca = {
    'GM': 'Chevrolet',
    'VW': 'Volkswagen',
    'Citroen': 'Citroën'
  };


//abaixo podemos incluir os carros com suas respectivos modelos quando dar erro na automação 

  const aliasesModeloPremium = {
    'Peugeot 2008': '2008',


    '116': 'Serie 1', '118': 'Serie 1', '120': 'Serie 1', '125': 'Serie 1', '128': 'Serie 1', '130': 'Serie 1', '135': 'Serie 1', '140': 'Serie 1',
    '316': 'Serie 3', '318': 'Serie 3', '320': 'Serie 3', '323': 'Serie 3', '325': 'Serie 3', '328': 'Serie 3', '330': 'Serie 3', '335': 'Serie 3', '340': 'Serie 3',
    '418': 'Serie 4', '420': 'Serie 4', '428': 'Serie 4', '430': 'Serie 4', '435': 'Serie 4', '440': 'Serie 4',
    '518': 'Serie 5', '520': 'Serie 5', '523': 'Serie 5', '525': 'Serie 5', '528': 'Serie 5', '530': 'Serie 5', '535': 'Serie 5', '540': 'Serie 5', '545': 'Serie 5', '550': 'Serie 5',
    '730': 'Serie 7', '735': 'Serie 7', '740': 'Serie 7', '745': 'Serie 7', '750': 'Serie 7', '760': 'Serie 7',

    'a160': 'Classe A', 'a180': 'Classe A', 'a200': 'Classe A', 'a250': 'Classe A', 'a35': 'Classe A', 'a45': 'Classe A',
    'b180': 'Classe B', 'b200': 'Classe B', 'b250': 'Classe B',
    'c180': 'Classe C', 'c200': 'Classe C', 'c220': 'Classe C', 'c230': 'Classe C', 'c250': 'Classe C', 'c280': 'Classe C', 'c300': 'Classe C', 'c350': 'Classe C', 'c43': 'Classe C', 'c63': 'Classe C',
    'e200': 'Classe E', 'e220': 'Classe E', 'e250': 'Classe E', 'e280': 'Classe E', 'e300': 'Classe E', 'e320': 'Classe E', 'e350': 'Classe E', 'e400': 'Classe E', 'e43': 'Classe E', 'e53': 'Classe E', 'e63': 'Classe E',
    's320': 'Classe S', 's350': 'Classe S', 's400': 'Classe S', 's450': 'Classe S', 's500': 'Classe S', 's550': 'Classe S', 's560': 'Classe S', 's600': 'Classe S', 's63': 'Classe S',
    'cla180': 'Classe CLA', 'cla200': 'Classe CLA', 'cla250': 'Classe CLA',
    'gla200': 'Classe GLA', 'gla250': 'Classe GLA', 'gla': 'Classe GLA',
    'glc250': 'Classe GLC', 'glc300': 'Classe GLC',
    'gle350': 'Classe GLE', 'gle400': 'Classe GLE', 'E420' :'classe E',

    'ml350': 'Classe ML',

    'suzukigrandvitara': 'Grand Vitara',
    'grandvitara': 'Grand Vitara',

    'crv': 'CR-V',
    'crv20': 'CR-V',
    'crv2': 'CR-V',
    'hrv': 'HR-V',
    'wrv': 'WR-v',
    

    'towncountry': 'Town & Country',
    'rangerover': 'Range Rover',
    'rangeroversport': 'Range Rover Sport',
    'rangerover sport': 'Range Rover Sport',

    'x60': 'X60',
    'x60': 'X60',

    'Grand Santa fe':'Grand Santa Fé',
    'Grand Santa Fé':'Grand Santa Fe',

    'Freelander': 'Freelander 2',

    'amarok highline' : 'Amarok',

    'ka 4cc': 'Ka',




  };

////  Mapear a marca pelo modelo do carro \\

  const mapaModeloMarca = {

    



    'c4 pallas': 'Citroën',
    'c4 cactus': 'Citroën',
    'ds3': 'Citroën',
    'c4': 'Citroën',
    'c3': 'Citroën',

    'Tt': 'Audi',
    'A4 Avant':'Audi',
    'A4':'Audi',

    'versa': 'Nissan',
    'kicks': 'Nissan',
    'march': 'Nissan',
    'Livina':'Nissan',

    'journey': 'Dodge',

    'freelander': 'Land Rover',
    'freelander 2': 'Land Rover',
    'range rover sport': 'Land Rover',
    'ranger rover sport': 'Land Rover',
    'range rover': 'Land Rover',
    'discovery 4': 'Land Rover',
    'discovery': 'Land Rover',

    'town & country': 'Chrysler',
    'town country': 'Chrysler',

    'scenic': 'Renault',
    'Captur': 'Renault',

    'fusion': 'Ford',
    'fiesta': 'Ford',
    'Edge':'Ford',
    'ecosport': 'Ford',
    'eco sport': 'Ford',
    'eco sport xls': 'Ford',
    'ka' : 'Ford',

    'polo tsi' : 'Volkswagen',
    't-cross': 'Volkswagen',
    't cross': 'Volkswagen',
    'tcross': 'Volkswagen',
    'tcros': 'Volkswagen',
    'virtus': 'Volkswagen',
    'jetta': 'Volkswagen',
    'golf': 'Volkswagen',
    'tiguan': 'Volkswagen',
    'nivus': 'Volkswagen',
    'taos': 'Volkswagen',
    'polo': 'Volkswagen',
    'passat cc': 'Volkswagen',
    'passat': 'Volkswagen',
    'Touareg':'Volkswagen',
    'Amarok' :'Volkswagen',

    'hr-v': 'Honda',
    'hrv': 'Honda',
    'cr-v': 'Honda',
    'crv': 'Honda',
    'Civic':'Honda',
    'Accord': 'Honda',

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
    'Azera': 'Hyundai',
    'Grand Santa Fé':'Hyundai',
    'i30':'Hyundai',

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
    'Gla': 'Mercedes-benz',

    'grand vitara': 'Suzuki',
    'vitara': 'Suzuki',

    'pulse': 'Fiat',
    'fastback': 'Fiat',
    'grand siena': 'Fiat',
    'argo': 'Fiat',
    'cronos': 'Fiat',
    'toro':'fiat',

    'Airtrek': 'Mitsubishi',

    'X60': 'Lifan',

    'Xc60': 'Volvo',
    'S60': 'volvo',

    'Renegade': 'Jeep',
    'Compass': 'Jeep',

    'Tiggo': 'Chery',
    'Tiggo 5x': 'Chery',
    
    'Tiggo 7': 'Chery',
    'QQ': 'Chery',

    'Corolla': 'Toyota',
    'Etios': 'toyota',

    'Grand Santa Fé':'Hyundai',

    'Duster':'Renault',
    'Sandero': 'Renault',

    '208': 'Peugeot',
    '307': 'Peugeot',
    'Peugeot 2008' : 'Peugeot',

    'ecosport': 'Ford',

  };


  const termosIgnorarModelo = new Set([
    'acabamento','xls','comando','ar','condicionado','controle','botao','botão','difusor',
    'catalisador','catalizador','escapamento','pistao','pistão','biela','motor',
    'reservatorio','reservatório','agua','água','radiador','volante','retrovisor',
    'moldura','painel','instrumento','tampao','tampão','tampa','porta','capo','capô',
    'farol','lanterna','parabarro','para','barro','grade','parachoque','choque','pisca',
    'milha','luz','amortecedor','coxim','alma','suporte','condensador','ventoinha',
    'eletroventilador','sensor','chicote','modulo','módulo','borracha','macaneta',
    'maçaneta','friso','aplique','acab','guia','defletor','spoiler','soleira','coluna',
    'vidro','maquina','máquina','fechadura','trinco','dobradiça','dobradica','forro',
    'capa','carenagem','traseiro','traseira','dianteiro','dianteira','esquerdo',
    'esquerda','detalhe','direito','direita','inferior','superior','interno','interna','externo',
    'externa','motorista','passageiro','de','da','do','dos','das','com','sem','novo',
    'usado','a','ate','ate',
    'tsi','tfsi','fsi','turbo','flex','diesel','gasolina','alcool','álcool','hibrido',
    'hybrid','16v','8v','12v','20v','24v','v6','v8','ex','exl','lx','lxl','xli',
    'gli','xrs','xei','xle','se','sel','gls','gl','gt','gti','lt','ltz','ls','joy',
    'advantage','exclusive','expression','dynamique','intense','zen','iconic','preta','preto','4cc','1.5', 'Highline',



  ]);

  function aplicarAliasModelo(dados) {
    if (!dados) return dados;

    if (dados.marca) {
      dados.marca = formatarMarca(dados.marca);
    }

    if (!dados.modelo) return dados;

    const modeloLimpo = limparComparacao(dados.modelo).replace(/\s+/g, '');
    const alias = aliasesModeloPremium[modeloLimpo];

    if (alias) {
      log(`Alias aplicado: ${dados.modelo} → ${alias}`);
      dados.modelo = formatarModelo(alias);
      return dados;
    }

    dados.modelo = formatarModelo(dados.modelo);
    return dados;
  }

  function limparModeloBruto(texto) {
    return limparComparacao(texto)
      .split(' ')
      .filter(t => t && !termosIgnorarModelo.has(t))
      .filter(t => !/^\d+(\.\d+)?$/.test(t))
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function extrairModeloProvavel(titulo) {
    const semAnos = String(titulo || '').replace(/\b(19|20)\d{2}\b/g, ' ');
    return limparModeloBruto(semAnos);
  }

  function encontrarModeloNoBanco(titulo) {
    const tituloNorm = normalizar(titulo);

    const modeloEncontrado = Object.keys(mapaModeloMarca)
      .sort((a, b) => b.length - a.length)
      .find(modeloMapeado => {
        const m = normalizar(modeloMapeado).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        return new RegExp(`(^|\\s)${m}(\\s|$)`).test(tituloNorm);
      });

    if (!modeloEncontrado) return null;

    const alias = aliasesModeloPremium[
      limparComparacao(modeloEncontrado).replace(/\s+/g, '')
    ];

    return {
      marca: formatarMarca(mapaModeloMarca[modeloEncontrado]),
      modelo: formatarModelo(alias || modeloEncontrado)
    };
  }

  function extrairDadosBase() {
    const titulo = document.querySelector('.headline__subtitle')?.innerText || '';
    const tituloNorm = normalizar(titulo);

    const banco = encontrarModeloNoBanco(titulo);

    let marca = banco?.marca;
    let modelo = banco?.modelo || '';

    const marcaEncontradaNoTitulo = marcas.find(m =>
      tituloNorm.includes(normalizar(m))
    );

    if (!marca && marcaEncontradaNoTitulo) {
      marca = formatarMarca(aliasesMarca[marcaEncontradaNoTitulo] || marcaEncontradaNoTitulo);
    }

    if (!modelo && marcaEncontradaNoTitulo) {
      const semAnos = titulo.replace(/\b(19|20)\d{2}\b/g, ' ');
      const partes = semAnos.split(new RegExp(marcaEncontradaNoTitulo, 'i'));
      modelo = limparModeloBruto(partes?.[1] || '');
    }

    const anos = [...titulo.matchAll(/\b(19|20)\d{2}\b/g)]
      .map(x => Number(x[0]));

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

    const banco = encontrarModeloNoBanco(dados.titulo);

    if (banco) {
      dados.marca = banco.marca;
      dados.modelo = banco.modelo;
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
    const limparTokens = txt =>
      limparComparacao(txt)
        .split(' ')
        .filter(t => t && !termosIgnorarModelo.has(t))
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

    const banco = encontrarModeloNoBanco(dados.titulo);

    if (banco) {
      dados.marca = banco.marca;
      dados.modelo = banco.modelo;
      log(`Banco interno antes do ML: ${dados.modelo} → ${dados.marca}`);
      return aplicarAliasModelo(dados);
    }

    const modeloProvavel = extrairModeloProvavel(dados.titulo);

    if (!modeloProvavel) {
      warn('Modelo provável não encontrado para buscar no ML.');
      return dados;
    }

    log(`Modelo provável para busca no ML: ${modeloProvavel}`);

    const modeloProvavelAlias = aliasesModeloPremium[
      limparComparacao(modeloProvavel).replace(/\s+/g, '')
    ] || modeloProvavel;

    const marcasParaTestar = dados.marca
      ? [formatarMarca(dados.marca)]
      : [
          'Chevrolet', 'Volkswagen', 'Fiat', 'Ford', 'Hyundai', 'Toyota',
          'Honda', 'Renault', 'Mitsubishi', 'Nissan', 'Jeep', 'Peugeot',
          'Citroën', 'BMW', 'Mercedes-Benz', 'Audi', 'Kia', 'Chrysler',
          'Dodge', 'Lifan', 'JAC', 'Chery', 'Land Rover', 'Suzuki'
        ];

    for (const marcaTeste of marcasParaTestar) {
      const marcaBusca = formatarMarca(marcaTeste);

      abrirDropdown(0);
      await esperar(500);

      await digitarBusca(marcaBusca);
      await esperar(500);

      if (!clicarCheckboxTextoExato(marcaBusca)) {
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

        dados.marca = marcaBusca;
        dados.modelo = formatarModelo(modeloAchado.texto);
        dados.marcaModeloJaSelecionados = true;

        log(`Detectado pelo ML: ${dados.marca} → ${dados.modelo}`);
        return aplicarAliasModelo(dados);
      }

      warn(`Modelo não encontrado em ${marcaBusca}. Tentando próxima marca.`);

      abrirDropdown(0);
      await esperar(400);
      desmarcarCheckboxTextoExato(marcaBusca);
      await esperar(500);
    }

    warn('Não foi possível detectar marca/modelo pelo ML.');
    return dados;
  }

  async function extrairDadosInteligente() {
    let dados = extrairDadosBase();

    if (!dados.marca || !dados.modelo) {
      dados = aplicarBancoInterno(dados);
    }

    if (!dados.marca || !dados.modelo) {
      dados = await detectarMarcaModeloPeloML(dados);
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
  // 1. BOTÃO CORRETO: Abrir menu
  const botaoMenu = document.querySelector(
    'button.compatibilities-checkbox-dropdown__trigger'
  );

  if (!botaoMenu) {
    warn('Botão Abrir menu não encontrado.');
    return false;
  }

  botaoMenu.click();
  log('Menu de seleção aberto.');

  await esperar(700);

  // 2. LOCALIZA A OPÇÃO "SELECIONAR TODOS"
  const opcoes = [...document.querySelectorAll(
    'button.andes-list__item-actionable'
  )];

  const botaoSelecionarTodos = opcoes.find(btn => {
    const texto = normalizar(
      btn.closest('li')?.innerText ||
      btn.parentElement?.innerText ||
      ''
    );

    return texto.includes('selecionar todos');
  });

  if (!botaoSelecionarTodos) {
    warn('Botão "Selecionar todos" não encontrado.');
    return false;
  }

  // 3. PEGA O CHECKBOX DA OPÇÃO
  const container = botaoSelecionarTodos.closest('li');

  const checkbox = container?.querySelector(
    'input.andes-checkbox__input'
  );

  if (!checkbox) {
    warn('Checkbox de "Selecionar todos" não encontrado.');
    return false;
  }

  // 4. CLICA NO CHECKBOX
  if (!checkbox.checked) {
    checkbox.click();
    log('Checkbox "Selecionar todos" clicado.');
  } else {
    log('Checkbox "Selecionar todos" já estava marcado.');
  }

  await esperar(500);

  // 5. CLICA NO BOTÃO DA OPÇÃO
  botaoSelecionarTodos.click();
  log('Botão "Selecionar todos" clicado.');

  await esperar(1000);

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
    await esperar(1400);
  }

  await selecionarAnos(dados.anoInicial, dados.anoFinal);
  await esperar(1000);

  await clicarBuscar();
  await esperar(1800);

  await selecionarTodos();
  await esperar(1800);

  if (CONFIG.salvarAutomatico) {
    salvar();
  } else {
    log('Teste finalizado. Salvar automático desligado.');
  }
})();
