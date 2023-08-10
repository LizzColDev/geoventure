import express, { Express } from "express";
import usersRouter from "./routes/users";

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/users', usersRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}...`)
})

export default app;