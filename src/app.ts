import express , { Application, Request, Response }  from 'express';

import { booksRouters } from "./app/controllers/books.controllers";
import { borrowRouters } from './app/controllers/borrow.controllers';



const app :Application = express();
app.use(express.json());

app.use('/api/books', booksRouters)
app.use('/api/borrow', borrowRouters)

app.get("/", (req : Request, res: Response) => {
  res.send("Welcome to the Express server start!!!!");
});



export default app;