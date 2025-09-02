import express, { Application, Request, Response } from 'express';
import { booksRouters } from "./app/controllers/books.controllers";
import { borrowRouters } from './app/controllers/borrow.controllers';
import cors from 'cors';

const app: Application = express();

app.use(express.json());
// এখানে বসাও
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://b5a4-react-redux.vercel.app');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

const allowedOrigins = [
  "http://localhost:5173",
  "https://b5a4-react-redux.vercel.app"
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Postman বা server-side request এর ক্ষেত্রে origin null হতে পারে
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
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
