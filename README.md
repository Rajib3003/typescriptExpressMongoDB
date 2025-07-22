
# project overview
This is a simple library management (API) system. Built using  Express, TypeScript, and MongoDB (via Mongoose).

# Installation

- Install fnm

    winget install Schniz.fnm

- Use Node.js version 22

    fnm install 22

- Initialize project

    npm init -y

- Install TypeScript and initialize config

    npm i -D typescript

    npm i -g typescript

    tsc --init

- Install dependencies

    npm i express

    npm i mongodb

    npm i mongoose

    npm i validator

    npm install zod

    npm i bcrypt



- Install dev dependencies

    -npm i --save-dev @types/express @types/validator  @types/bcrypt

    -npm i ts-node-dev

# API Endpoints

Books
- Create a new book  
    POST /api/books 

- Get all books
    GET /api/books   

- Get a book by ID 
    GET /api/books/:bookId  

- Update a book    
    PATCH /api/books/:bookId

- Delete a book 
    DELETE /api/books/:bookId 


- Borrow a Book
    POST /api/borrow

- Borrowed Books Summary
    GET /api/borrow


# Create book : POST /api/books example

{

  "title": "The Theory of Everything",

  "author": "Stephen Hawking",

  "genre": "SCIENCE",

  "isbn": "9780553380163",

  "description": "An overview of cosmology and black holes.",

  "copies": 5,

  "available": true

}

# vercel 

- npm i -g vercel
- vercel -v
- vercel login
- vercel --prod

    (for me)
    Inspect: https://vercel.com/mohammad-rajib-bhuiyans-projects/typescript-express-mongo-db/Fo67Aarhy5kecCN8KSzmWrDuE5Zi
    (ctrl + click)

# vercel Link 

- https://typescript-express-mongo-db.vercel.app/

# github link
- https://github.com/Rajib3003/typescriptExpressMongoDB#

# video link

https://drive.google.com/file/d/1VMMzLT--XdMy8tFOqCy1_xCRv-98hStT/view?usp=drive_link




