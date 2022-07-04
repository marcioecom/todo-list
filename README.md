# Todo List

Um sistema desenvolvido para empresa **Ebytr** capaz de auxiliar as pessoas colaboradoras a se organizar e ter mais produtividade.

Link do projeto: https://todo-list-marciojr.vercel.app

## Skills

- Nodejs
- ReactJs
- NestJs
- Prisma ORM (Postgres)
- Monorepo

</br>

## Instalação do projeto

Na raiz do projeto rode o comando para instalar as dependências:

```bash
$ npm i
```
se você usa **yarn**:
```bash
$ yarn
```

</br>

## Iniciar projeto usando docker

Na raiz do projeto rode o seguinte comando:
```bash
$ docker-compose up -d
```
</br>

## Iniciar projeto sem docker

- _Primeiro certifique que um banco Postgres esteja rodando na porta padrão (5432)_

Entre dentro da pasta packages e inicie o front e backend
>Pasta server -> backend </br>
Pasta web -> frontend

dentro de web use o comando:
```bash
$ npm run dev
```

dentro de server use o comando:
```bash
$ npm run start:dev
```
