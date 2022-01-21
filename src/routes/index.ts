import { Router } from "express";
import loginRouter from "./LoginRoute";
import userRouter from "./UserRoutes";

const routes = Router();

routes.use("/login", loginRouter);
routes.use("/user", userRouter);

export default routes;
