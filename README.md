# Mentores Online

O **Mentores Online** é uma organização especializada em produzir conteúdos sobre empreendedorismo, comportamento e inovação. Produzimos vídeos com conceito de documentários que contam a **história de pessoas que são autoridade** em suas áreas de atuação.

**Estamos produzindo conteúdos semanais!** :tada:

Para acessar nossos conteúdos semanais, é só [nos seguir no instagram](https://www.instagram.com/mentoresonline/) e ficar de olho nas Lives que acontecem nas Quintas e Sábados, lideradas por André, empresário e multi-franqueado Rockfeller.

## Instalando e rodando o site

1. [Clonar repositório](#1-clonar-o-repositorio)
2. [Instalar as dependências NPM](#2-instalar-as-dependencias-npm)
    1. [GulpJS](#)
    2. [BrowserSync](#)
3. [Rodar o site](#3-rodar-o-site)
4. [Build do site](#4-build-do-site)

### 1. Clonar o repositorio
```bash
git clone git@github.com:happycrappie/mentoresonline.git
```

### 2. Instalar as dependencias NPM
```bash
npm i
```

#### 2.1. Instale GulpJS, se não tiver instalado
```bash
npm i -g gulp-cli
```

#### 2.2. Instale BrowserSynch, se não tiver instalado
```bash
npm i -g browser-sync
```

### 3. Rodar o site
```bash
npm run dev
```

### 4. Build do site
```bash
npm run build
```

## Estrutura

1. Source
    1. **Assets:** guarda todas as imagens e arquivos de fontes usados no site.
    2. **Javascript:** guarda todos os arquivos de javascript usados no site.
    3. **Sass:** guarda todos os arquivos de Sass usados para estilizar o site.
    4. **Views:** guarda todos os arquivos de PugJS e HTML do site.

```
src
  |- assets
  |
  |- js
  |
  |- sass
  |
  |- views
```

Todo o código fonte estará dentro da pasta [**src**](https://github.com/happycrappie/mentoresonline/tree/master/src). Quando a **build** for feita, uma pasta chamada **public** será criada, e o servidor local (BrowserSync) servirá aqueles arquivos.

Toda vez que você salvar os arquivos, o pré-processador (Gulp) vai rodar para servir os arquivos atualizados da pasta Public.

### Sass

```
src
  |- sass
      |- components
      |- sections
      |- templates
      |- typography
      |- views
```

|Nome|Descrição|
|-------|------|
|Components|São elementos reutilizáveis, podem ser singulares (como botões), ou complexos (como cards).|
|Sections|São seções prontas do site, geralmente feitas para serem inclusas em diversas páginas.|
|Templates|São páginas pré-prontas, com várias seções.|
|Views|São estilos específicos de uma página|
|Typography|Configurações de tipografia.|


*Documentação em construção.*
