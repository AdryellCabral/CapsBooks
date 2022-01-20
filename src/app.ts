import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import connection from "./database";
import AppError from "./errors/AppError";
import routes from "./routes";

connection();

const app = express();

app.use(express.json());
app.use(routes);

app.use((err: Error, req: Request, res: Response, nex_: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  console.log(err);

  return res.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
});

app.listen(3000, () => {
  console.log(">>>> Server started on http://localhost:3000 <<<<");
});

export default app;
