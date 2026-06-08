# Automação Mercado Livre - Compatibilidade e Posições

## Descrição

Extensão desenvolvida para automatizar o preenchimento de compatibilidades e posições em anúncios do Mercado Livre.

O objetivo é reduzir o trabalho manual na tela de compatibilidade, identificando automaticamente marca, modelo e anos do veículo a partir do título do anúncio.

---

## Funcionalidades

### Preencher Compatibilidade

A automação:

* Lê o título do anúncio
* Identifica marca, modelo e anos
* Utiliza banco interno de veículos conhecidos
* Realiza busca inteligente dentro do próprio Mercado Livre
* Utiliza similaridade para encontrar modelos escritos de formas diferentes
* Seleciona os anos automaticamente
* Executa a busca
* Seleciona todos os resultados encontrados
* Salva a compatibilidade

### Preencher Posições

A automação:

* Analisa o título do anúncio
* Identifica lado:

  * Esquerdo
  * Direito
* Identifica posição:

  * Dianteiro
  * Traseiro
* Seleciona automaticamente as posições compatíveis
* Adiciona as posições ao anúncio

---

## Requisitos

A automação funciona apenas dentro da tela de compatibilidade do Mercado Livre.

Exemplo:

Anúncios → Editar anúncio → Compatibilidade

Os botões não possuem função em outras páginas do Mercado Livre.

---

## Estrutura do Projeto

manifest.json

Configuração da extensão Chrome.

popup.html

Interface da extensão.

popup.js

Controle dos botões da extensão.

compatibilidade.js

Automação de compatibilidades.

posicoes.js

Automação de posições.

---

## Fluxo da Compatibilidade

1. Ler título do anúncio
2. Extrair veículo
3. Extrair anos
4. Detectar marca e modelo
5. Buscar dentro do Mercado Livre
6. Utilizar banco interno quando necessário
7. Aplicar similaridade para modelos equivalentes
8. Selecionar anos
9. Buscar compatibilidades
10. Selecionar todos
11. Salvar

---

## Observações

A automação foi desenvolvida para auxiliar o cadastro de autopeças e acessórios automotivos.

O desempenho depende da qualidade do título do anúncio e das opções disponibilizadas pelo próprio Mercado Livre.

Modelos não encontrados pelo sistema podem ser adicionados ao banco interno para melhorar futuras detecções.

---

## Status do Projeto

Em desenvolvimento contínuo.

Melhorias futuras:

* Expansão do banco de veículos
* Aprimoramento da similaridade
* Atualizações automáticas
* Interface mais completa
* Novas automações para anúncios
