# Product App

Aplicação de loja simples com CRUD de produtos, filtros, listagem e grid de produtos, relatórios em DOCX e gráficos de categorias.

## Tecnologias utilizadas

- **Backend**: Django 4.x, Django REST Framework
- **Frontend**: Angular 20 (Standalone Components)
- **Banco de dados**: PostgreSQL 15 (via Docker) - Docker e Docker Compose
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

## Pré-requisitos

- Docker e Docker Compose
- Python 3.9+
- Node.js 20+
- npm
- Navegador moderno

## Observações

- O frontend do projeto utiliza **Angular 20 com Angular Universal** para habilitar Server-Side Rendering (SSR). 
- Todas as imagens de produtos estão no diretório `media/products/` do backend.
- O frontend consome a API Django via URL `http://localhost:8000/api/products/`.


## Configuração do banco com Docker

Na raiz do projeto existe um `docker-compose.yml` para subir o PostgreSQL:

```bash
docker-compose up -d
```

Isso criará um container PostgreSQL na porta padrão 5432.

## Backend

1. Copie e preencha o .env e ative o virtualenv:

```bash
cd backend
cp .env.example .env       # lembre de preencher o que for necessário
python -m venv .venv       # Ou python3 se for o caso -> python3 -m venv .venv 
source .venv/bin/activate  # macOS/Linux
.venv\Scripts\activate     # Windows
```

2. Instale as dependências:

```bash
pip install -r requirements.txt
```

3. Configure o `settings.py` com os dados do PostgreSQL (já incluso no projeto).

4. Rode as migrations:

```bash
python manage.py migrate
```

5. Crie superuser (opcional, para acessar admin):

```bash
python manage.py createsuperuser
```

6. Popule a base de dados com produtos de exemplo (seeds):

```bash
python manage.py seed_products
```

7. Rode o backend:

```bash
python manage.py runserver
```

A API estará disponível em: `http://localhost:8000/api/products/`

## Frontend

1. Entre na pasta frontend:

```bash
cd frontend
```

2. Mude para a versão node do projeto:

```bash
nvm use       # Caso não possua a v20.19 -> nvm install v20.19
```

4. Instale dependências:

```bash
npm install
```

5. Rode a aplicação Angular:

```bash
npm run start
```

A aplicação estará disponível em: `http://localhost:4200/products` para gerenciamento e dashboard e `http://localhost:4200` para o grid.

## Funcionalidades

- CRUD de produtos (nome, descrição, categoria, preço, estoque, imagem)
- Filtros por nome, categoria e faixa de preço (backend e frontend)
- Listagem e Grid de produtos
- Gráfico de quantidade de produtos por categoria (Plotly.js)
- Relatório DOCX com tabela de produtos (Docxtemplater)
- Seed de produtos de exemplo