<div id="top"></div>

<h1 align="center">Organize API</h1>

pt-BR | [en](./README.md)

Esta é uma API que faz parte do projeto organize, uma ferramenta para você criar, abrir e organizar seus projetos JavaScript. Veja o projeto organize [aqui](https://github.com/Suares01/organize-CLI).

<details>
  <summary>Tabela de Conteúdo</summary>
  <ol>
    <li><a href="#funcionalidades">Funcionalidades</a></li>
    <li><a href="#tecnologias">Tecnologias</a></li>
    <li><a href="#rotas">Rotas</a></li>
    <li><a href="#licença">Licença</a></li>
    <li><a href="#contato">Contato</a></li>
  </ol>
</details>

---

## Funcionalidades

- [x] Registro e autenticação de usuário
- [x] Pegar informações do usuário
- [x] Registrar projetos do usuário
- [x] Listar um projeto específico ou todos os projetos do usuário

<p align="right">(<a href="#top">voltar</a>)</p>

## Tecnologias

- Node.js
- TypeScript
- Babel
- Mongoose
- Express
- Overnightjs
- jest/supertest
- swagger

<p align="right">(<a href="#top">voltar</a>)</p>

## Rotas

O endpoint base da API é https://api-organize.herokuapp.com/, para mais informações e testar as rotas você pode ver a documentação [aqui](https://api-organize.herokuapp.com/docs/).

Para se autenticar na aplicação adquirir um token através da rota **/users/authenticate**, esse token precisa ser enviado no campo **x-access-token** no cabeçalho da requisição.

_POST_ **/users**: Esta rota é responsável pela criação do usuário. Você deve enviar o **username** e a **password** no corpo da solicitação. Você recebe um objeto com id, username e created_at.

_POST_ **/users/authenticate**: Esta rota é responsável pela autenticação do usuário. Você deve enviar o **username** e a **password** no corpo da solicitação. Você recebe um objeto com o token do usuário, este token é usado para autenticar o usuário na API.

_GET_ (precisa de autenticação) **/users/me**: Esta rota é responsável por retornar as informações do usuário.

_POST_ (precisa de autenticação) **/projects**: Esta rota é responsável por criar um novo projeto e retornar suas informações. O corpo da solicitação recebe duas informações: **name** e **path** do projeto.

_GET_ (precisa de autenticação) **/projects**: Esta rota é responsável por listar todos os projetos do usuário.

_GET_ (precisa de autenticação) **/projects/{name}**: Essa rota é responsável por retornar um projeto específico usando o nome do projeto fornecido pelo usuário.

<p align="right">(<a href="#top">voltar</a>)</p>

## Licença

Distribuído sob a licença MIT. Veja [LICENSE](./LICENSE) para mais informações.

<p align="right">(<a href="#top">voltar</a>)</p>

## Contato

Lucas Suares - suares_silva.01@hotmail.com

<p align="right">(<a href="#top">voltar</a>)</p>

---

<p align="center">Copyright © 2022 Lucas Suares</p>
