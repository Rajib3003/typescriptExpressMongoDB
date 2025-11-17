import express, { Application, Request, Response } from 'express';
import { booksRouters } from "./app/controllers/books.controllers";
import { borrowRouters } from './app/controllers/borrow.controllers';
import cors from 'cors';
import { noticeRouters } from './app/controllers/notice.controllers';

const app: Application = express();

app.use(express.json());


const allowedOrigins = [
  'http://localhost:5173',
  'https://b5a4-react-redux.vercel.app'
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use('/api/books', booksRouters);
app.use('/api/borrow', borrowRouters);
app.use('/api/notice', noticeRouters);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Express server start!!!!");
});

export default app;
