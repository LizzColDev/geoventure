import express, { Express } from "express";
import dotenv from 'dotenv';
dotenv.config();

import usersRouter from "./routes/users";
import gamesRouter from "./routes/games";


const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/', usersRouter);
app.use('/', gamesRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}...`)
})

export default app;
