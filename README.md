# veganAPI

<img src="img/veganapi_logo.png" width="410"/> <img src="img/reprograma_logo.png" width="410"/>

## Descrição

## Arquitetura

![](img/api.png)

## Ferramentas / Dependências

 - [VSCode](https://code.visualstudio.com/)
 - [nodejs](https://nodejs.org/)
 - [mongodb](https://www.mongodb.com/)
 - [npm](https://www.npmjs.com/)
 - [nodemon](https://www.npmjs.com/package/nodemon)
 - [mongoose](https://www.npmjs.com/package/mongoose)
 - [express](https://www.npmjs.com/package/express)
 - [cors](https://www.npmjs.com/package/cors)
 - [dotenv](https://www.npmjs.com/package/dotenv)

## Endpoints

Método | Caminho | Descrição
------ | ------- | ---------:
GET | /produtos | Retorna todos os produtos.
GET | /produtos/:_id | Retorna um produto.
POST | /produtos | Adiciona um produto.
POST | /produtos/lista | Adiciona uma _array_ de produtos.
PUT | /produtos/:_id | Altera um produto.
DELETE | /produto/:_id | Deleta um produto.
GET | /tipos | Retorna todos os tipos.
GET | /tipos/:_id | Retorna um tipo.
POST | /tipos | Adiciona um tipo.
PUT | /tipo/:_id | Altera um tipo.
DELETE | /tipo/:_id | Deleta um tipo.

## TODO

- Cadastro de usuários
- Submissão de revisão de informações por parte dos usuários
- 