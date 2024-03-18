# Book Search Engine
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Built With
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248.svg?style=for-the-badge&logo=MongoDB&logoColor=white)](https://www.mongodb.com/)
[![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)](https://expressjs.com/)
[![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://react.dev/)
[![Node.JS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/en)
[![GraphQL](https://img.shields.io/badge/GraphQL-E10098.svg?style=for-the-badge&logo=GraphQL&logoColor=white)](https://graphql.org/)
[![Apollo GraphQL](https://img.shields.io/badge/Apollo%20GraphQL-311C87.svg?style=for-the-badge&logo=Apollo-GraphQL&logoColor=white)](https://www.apollographql.com/)

## Description
The Book Search Engine is a web application built with the MERN stack (MongoDB, Express.js, React, Node.js) that allows users to search for books using the Google Books API. Users can create accounts, log in, search for books, save them to their account, and remove books from their saved list.

This project was initially developed with a RESTful API architecture but has been refactored to use GraphQL with Apollo Server for improved performance and flexibility. With GraphQL, users can efficiently fetch and modify data using queries and mutations, providing a more streamlined experience.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Questions](#questions)

## Installation
To get started with the Book Search Engine, follow these steps:

1. Clone the repository to your local machine.
    ```bash
    git clone https://github.com/kyoriku/book-search-engine.git
    ```
2. Navigate to the project directory.
    ```bash
    cd book-search-engine
    ```
3. Install the required dependencies.
    ```bash
    npm install
    ```

## Usage
### Running Locally
- To run the project locally, use the following command:
  ```bash
  npm run develop
  ```
  This command initiates both the server and client development environments concurrently. It will launch the development server and open the Book Search Engine in your default web browser.

### Building for Production
- To build the project for production, use the following command:
  ```bash
  npm run build
  ```
  This command will create a production-ready build of the Book Search Engine, optimized for performance and ready to be deployed to your hosting provider.

### Screenshots
![home](screenshots/screenshot-1-homepage.jpg)
![signup](screenshots/screenshot-2-sign-up.jpg)
![login](screenshots/screenshot-3-login.jpg)
![search](screenshots/screenshot-4-search-book.jpg)
![save](screenshots/screenshot-5-save-book.jpg)
![saved](screenshots/screenshot-6-saved-books.jpg)
![remove](screenshots/screenshot-7-remove-book.jpg)

## License
This application is covered by the [MIT](https://opensource.org/licenses/MIT) license.

## Contributing
If you want to contribute to this project, follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them with descriptive commit messages.
4. Push your changes to your branch.
5. Submit a pull request, explaining your changes.

## Questions
If you have any questions, please contact [kyoriku](https://github.com/kyoriku) or email devkyoriku@gmail.com.