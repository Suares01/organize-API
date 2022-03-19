<div id="top"></div>

<h1 align="center">Organize API</h1>

[pt-BR](./README_ptbr.md) | en

This is an API that is part of the organize project, a tool for you to create, open and organize your JavaScript projects. See the project [here](https://github.com/Suares01/organize-CLI).

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#features">Features</a></li>
    <li><a href="#built-with">Built With</a></li>
    <li><a href="#routes">Routes</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

---

## Features

- [x] Register and auth user
- [x] Get user informations
- [x] Register user projects
- [x] List a specific project and all user projects

<p align="right">(<a href="#top">back to top</a>)</p>

## Built With

- Node.js
- TypeScript
- Babel
- Mongoose
- Express
- Overnightjs
- jest/supertest
- swagger

<p align="right">(<a href="#top">back to top</a>)</p>

## Routes

The base endpoint of API is https://api-organize.herokuapp.com/, for more informations and test the routes you can see the documentation [here](https://api-organize.herokuapp.com/docs/).

To authenticate to the app, acquire token via the **/users/authenticate** route, this token needs to be sent in the **x-access-token** field in the request header.

_POST_ **/users**: This route is responsible of the user creation. You have to send the **username** and the  **password** in the request body. You receive an object with id, username and created_at.

_POST_ **/users/authenticate**: This route is responsible of the user authentication. You have to send the  **username** and **password** in the request body. You receive an object with the user token, this token is used to authenticate the user in the API.

_GET_ (authentication accuracy) **/users/me**: This route is responsible to decode the user token and return the user informations. You need to send the token in the **x-access-token** field in the request header.

_POST_ (authentication accuracy) **/projects**: This route is responsible to create a new project and return your information. The request body receive two information: name and path of the project.

_GET_ (authentication accuracy) **/projects**: This route is responsible to list all projects of the user.

_GET_ (authentication accuracy) **/projects/{name}**: This route is responsible for returning a specific project using the project name provided by the user.

<p align="right">(<a href="#top">back to top</a>)</p>

## License

Distributed under the MIT License. See [LICENSE](./LICENSE) for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

## Contact

Lucas Suares - suares_silva.01@hotmail.com

<p align="right">(<a href="#top">back to top</a>)</p>

---

<p align="center">Copyright © 2022 Lucas Suares</p>
