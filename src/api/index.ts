import { VercelRequest, VercelResponse } from '@vercel/node';
import app from '../app';
import { createServer } from 'http';

const server = createServer(app);

export default (req: VercelRequest, res: VercelResponse) => {

  res.setHeader('Access-Control-Allow-Origin', 'https://b5a4-react-redux.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

 
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  
  server.emit('request', req, res);
};
