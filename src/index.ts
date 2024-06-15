import express, { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const base_url = process.env.BASE_URL;
const port = process.env.PORT;
const app = express();

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("hello world");
});

app.listen(port, () => {
  console.log(`server running at ${base_url}:${port}`);
});
