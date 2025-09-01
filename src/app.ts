import express, { Application, Request, Response } from 'express';
import { booksRouters } from "./app/controllers/books.controllers";
import { borrowRouters } from './app/controllers/borrow.controllers';
import cors from 'cors';

const app: Application = express();

app.use(express.json());

app.use(
  cors({
    origin: [
      'https://b5a4-react-redux.vercel.app', // ✅ এখানে শেষের স্ল্যাশ তুলে দাও
      'http://localhost:5173'
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true
  })
);

app.use('/api/books', booksRouters);
app.use('/api/borrow', borrowRouters);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Express server start!!!!");
});

export default app;
