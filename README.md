
# project overview
This is a simple library management (API) system. Built using  Express, TypeScript, and MongoDB (via Mongoose).

# Installation

1. Install fnm
    winget install Schniz.fnm

2. Use Node.js version 22
    fnm install 22

3. Initialize project
    npm init -y

4. Install TypeScript and initialize config
    npm i -D typescript
    npm i -g typescript
    tsc --init

5. Install dependencies
    npm i express
    npm i mongodb
    npm i mongoose
    npm i validator
    npm install zod
    npm i bcrypt


6. Install dev dependencies
    npm i --save-dev @types/express @types/validator  @types/bcrypt
    npm i ts-node-dev

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