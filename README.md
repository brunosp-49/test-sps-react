# SPS REACT TEST

CRUD de usuários com login e rotas protegidas. Instruções para rodar o projeto estão abaixo.

## Escopo atendido

- **Login seguro:** página de signIn com autenticação via API e token persistido.
- **CRUD completo de usuários:** listar, cadastrar, editar e excluir.
- **Acesso restrito:** apenas usuários autenticados acessam a lista e as ações; rotas protegidas com redirecionamento para `/signin`.

## Testar online

Você pode testar o app em produção sem rodar localmente:

- **URL:** [https://test-sps-react-sage.vercel.app](https://test-sps-react-sage.vercel.app)

O front-end em produção depende de uma API (back-end) acessível pela internet. Se a API estiver indisponível ou em outro endereço, o login pode falhar; nesse caso, use as instruções abaixo para rodar o projeto localmente com seu próprio back-end.

## Como rodar o projeto

1. **Tenha o back-end rodando**
  O front consome a API do repositório [test-sps-server](https://github.com/SPS-Group/test-sps-server). Suba o servidor antes de abrir o app.
2. **Instale as dependências e configure o ambiente:**
  ```bash
   yarn install
   cp .env.example .env
  ```
   Edite o `.env` e deixe `REACT_APP_SERVER_URL` apontando para a URL do back-end (ex.: `http://localhost:3001`).
3. **Inicie o front-end:**
  ```bash
   yarn dev
  ```
   O app abre em `http://localhost:3000` (a porta pode ser outra se a 3000 estiver em uso).

**Resumo (copy & paste):**

```bash
yarn install
cp .env.example .env
yarn dev
```

### Variáveis de ambiente


| Variável               | Obrigatória | Descrição                                       |
| ---------------------- | ----------- | ----------------------------------------------- |
| `REACT_APP_SERVER_URL` | Sim         | URL base da API (ex.: `http://localhost:3001`). |


### Login de teste

Use o usuário admin do back-end para entrar no sistema:

- **E-mail:** `admin@spsgroup.com.br`
- **Senha:** `1234`

### Scripts disponíveis


| Comando                    | Descrição                          |
| -------------------------- | ---------------------------------- |
| `yarn dev` ou `yarn start` | Sobe o app em modo desenvolvimento |
| `yarn build`               | Gera o build de produção           |
| `yarn test`                | Roda os testes                     |


### Nota sobre segurança

O token JWT é armazenado em `localStorage` conforme permitido pelo enunciado. Em um ambiente de produção, consideraria tokens de curta duração com refresh token ou uso de cookies httpOnly para reduzir o risco de roubo via XSS.

---

## Regras do teste

- Criar a página de signIn para fazer a autenticação do usuário (usar o usuário previamente cadastrado para validar).
- Pode usar qualquer tipo de storage para guardar o token.
- Só será possível cadastrar e/ou visualizar os usuários se estiver autenticado.
- Chamar a API que foi criada anteriormente (test-sps-server).

**Stack:** React 18, TypeScript, Redux Toolkit, React Query, React Router v6, Chakra UI, i18next (PT/EN/ES).