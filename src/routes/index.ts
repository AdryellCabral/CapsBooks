import { Router } from "express";
import loginRouter from "./login.routes";
import userRouter from "./user.routes";
import bookRouter from "./book.routes";
import cartRouter from "./cart.routes";
import purchaseRouter from "./purchase.routes";
import reviewRouter from "./review.routes";
import recoverRouter from "./recover.routes";
import changePasswordRouter from "./changePassword.routes"

const routes = Router();

routes.use("/login", loginRouter);
routes.use("/user", userRouter);
routes.use("/book", bookRouter);
routes.use("/cart", cartRouter);
routes.use("/purchase", purchaseRouter);
routes.use("/review", reviewRouter);
routes.use("/recover", recoverRouter);
routes.use("/change_password", changePasswordRouter);

export default routes;
