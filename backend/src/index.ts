import express, { Express, Request, Response } from 'express';

import usersRouter from './routes/users';
import indexRouter from './routes';

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/', indexRouter);

app.use('/users', usersRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

export default app;