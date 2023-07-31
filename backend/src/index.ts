import express, { Express, Request, Response } from 'express';
import usersRouter from './routes/users';
import indexRouter from './routes';

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;