import { Router } from "express";
import AuthService from "../services/Login/AuthService";

const loginRouter = Router();

loginRouter.post("/", async (req, res) => {
  const { email, password } = req.body;
  const authUser = new AuthService();
  const userResponse = await authUser.execute({ email, password });

  return res.json(userResponse);
});

export default loginRouter;
