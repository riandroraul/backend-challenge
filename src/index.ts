import express, { Request, Response } from "express";
import dotenv from "dotenv";
import router from "./routes/Routes";

dotenv.config();

const base_url = process.env.BASE_URL;
const port = process.env.PORT;
const app = express();
app.use(express.json());
app.use("/api", router);

app.listen(port, () => {
  console.log(`server running at ${base_url}:${port}`);
});
