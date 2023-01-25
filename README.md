# Studio Sol Password Validation Avaliation

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for avaliation testing purposes.

### Prerequisites

- Node.js
- npm or yarn
- unzip(or other compression tool)
- Postman(or other similar tool)

### Installing

1. Download the zip file in [this link](https://drive.google.com/file/d/1YH1Je_CUehI6q1t-AhKXPfSbAHqgJy8x/view?usp=sharing)(required by the avaliation), or clone this repo

2. Unzip repository(if you downloaded the zip)

`unzip studioSolAvaliation.zip`

3. Install the dependencies

`npm i` or `yarn`

4. Start the server

`npm start`

5. Have fun!


### Scripts

- `start`: Starts the server
- `dev`: Starts the server with nodemon for development
- `test`: Runs the Mocha and Chai tests

## Built With

- [![express](https://img.shields.io/badge/Express-green)](https://expressjs.com/)
- [![express-graphql](https://img.shields.io/badge/Express%20graphql-green)](https://github.com/graphql/express-graphql)
- [![ramda](https://img.shields.io/badge/Ramda-green)](https://ramdajs.com/)
- [![graphql](https://img.shields.io/badge/Graphql-green)](https://graphql.org/)
- [![mocha](https://img.shields.io/badge/Mocha-green)](https://mochajs.org/)
- [![chai](https://img.shields.io/badge/Chai-green)](https://www.chaijs.com/)

## Test

This app contains a lot of unitary tests that cover a lot of possibilities of input.
The app is about password validation, where the query receives a password string and an array of rules to apply to it, return an object with verify(bool) and noMatch(failed rules name).
Queries like described in [this doc](https://akamai.sscdn.co/gcs/studiosol/2022/backend/prova.pdf) can be made to `localhost:8080/graphql` after server starts.

## Author

* **Gustavo Ennes** -  [![github](https://img.shields.io/badge/Github-profile-green)](https://github.com/Gustavo-Ennes) [![website](https://img.shields.io/badge/Personal%20website-ennes.dev-green)](https://ennes.dev)  [![linkedin](https://img.shields.io/badge/Linkedin-profile-green)](https://linkedin.com/in/gustavo-ennes) 

## License

![license](https://img.shields.io/badge/license-ISC-green)
