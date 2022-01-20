import { Router } from "express";
import loginRouter from "./LoginRoute";

const routes = Router();

routes.use("/login", loginRouter);

export default routes;
