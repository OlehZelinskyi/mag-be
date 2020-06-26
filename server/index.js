import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import roots from "./routes/index.js";

dotenv.config();

const app = express();
const port = 5000 || process.env.PORT;

app.use(cors({ origin: process.env.ORIGIN }));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(roots);

app.listen(port, () => console.log(`App is listening on port: ${port}`));

export default app;
