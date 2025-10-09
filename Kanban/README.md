# Kanban App

## Sobre o Projeto

Kanban é uma aplicação web interativa para gerenciar tarefas de forma visual e eficiente. Permite criação, edição e movimentação de tarefas entre colunas, com autenticação de usuários e integração via API Django REST Framework.

---

## Funcionalidades

- Cadastro e login de usuários  
- Criação, edição e exclusão de tarefas  
- Colunas Kanban: **A fazer, Fazendo, Pronto**  
- Drag and drop para reorganização de tarefas  
- Interface responsiva e moderna

---

## Tecnologias Utilizadas

- **Frontend:** React.js, React DnD  
- **Backend:** Django, Django REST Framework  
- **Banco de dados:** SQLite

---

## Pré-requisitos

Antes de iniciar, instale em sua máquina:

- Python 3.10+  
- Node.js 16+  
- npm ou yarn

---

## Rodando o Backend

1. Abra o terminal e entre na pasta do backend:

```bash
cd back
```

2. Crie e ative um ambiente virtual:

- Windows:

```bash
python -m venv env
env\Scripts\activate
```

3. Instale as dependências:

```bash
pip install -r requirements.txt
```

4. Aplique as migrações do banco:

```bash
python manage.py migrate
```

5. Inicie o servidor Django:

```bash
python manage.py runserver
```

O backend estará em `http://127.0.0.1:8000/`.

---

## Rodando o Frontend

1. Abra outro terminal e vá para a pasta do frontend:

```bash
cd front
```

2. Instale as dependências:

```bash
npm install
# ou
yarn install
```

3. Inicie o servidor de desenvolvimento:

```bash
npm start
# ou
yarn start
```

O frontend estará em `http://localhost:3000/`.

---

## Observações

- Sempre inicie o backend antes do frontend.  
- Configure variáveis de ambiente e endpoints para produção conforme necessário.

