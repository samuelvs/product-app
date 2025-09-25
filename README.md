# Product App

Aplicação de loja simples com CRUD de produtos, filtros, listagem e grid de produtos, relatórios em DOCX e gráficos de categorias.

## Pré-requisitos

- Docker >= 24
- Docker Compose >= 2

## Tecnologias utilizadas no projeto

- **Backend**: Django 4.x, Django REST Framework
- **Frontend**: Angular 20 (Standalone Components)
- **Banco de dados**: PostgreSQL 15
- **Gerenciamento de pacotes**: pip (backend) / npm (frontend)
- **Relatórios DOCX**: Docxtemplater, PizZip, FileSaver
- **Gráficos**: Plotly.js

## Estrutura do projeto

```
product-app/
├─ backend/          # Django + DRF
├─ frontend/         # Angular
├─ docker-compose.yml
├─ README.md
```

## Observações

- O frontend utiliza **Angular Universal** para **Server-Side Rendering (SSR)**, melhorando:
  - **Performance** do carregamento inicial.
  - **SEO**, já que o conteúdo é renderizado no servidor e indexável pelos buscadores.

- O layout é totalmente responsivo, funcionando bem em desktops, tablets e dispositivos móveis.
- Todas as imagens de produtos estão no diretório `media/products/` do backend.
- **Lazy load de imagens** otimiza o carregamento em listas e grids, reduzindo o uso de banda.
- A filtragem da Lista de produtos também filtra o que aparece no gráfico e no relatório.
- O frontend consome a API Django via `http://localhost:8000/api/products/`.

## Configuração do banco com Docker

1. Subir containers (frontend, backend, db):

```bash
docker-compose up -d --build
```

As migrations e seeds já são executadas automaticamente no container do backend.

2. Acessar aplicações:

- Frontend Angular: http://localhost:4200
- Backend Django: http://localhost:8000/api/products/

## Funcionalidades

- CRUD de produtos (nome, descrição, categoria, preço, estoque, imagem)
- Filtros por nome, categoria e faixa de preço (backend e frontend)
- Listagem e Grid de produtos
- Gráfico de quantidade de produtos por categoria (Plotly.js)
- Relatório DOCX com tabela de produtos (Docxtemplater)