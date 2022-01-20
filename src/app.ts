import express from "express";
import "express-async-errors";
import connection from "./database";

connection();

const app = express();

app.use(express.json());

app.listen(3000, () => {
  console.log(">>>> Server started on http://localhost:3000 <<<<");
});

export default app;
