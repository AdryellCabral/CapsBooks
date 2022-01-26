import { Router } from "express";
import ChangePasswordService from "../services/Mailer/ChangePasswordService";

import AppError from "../errors/AppError";
import changePasswordAuth from "../middlewares/verifications/changePasswordAuth";


const changePasswordRouter = Router();
changePasswordRouter.post("/", changePasswordAuth, async (req, res) => {
    const { password, email } = req.body;

    const changePasswordUser = new ChangePasswordService();
    
    const user = await changePasswordUser.execute({
      password,
      old_password: req.validation.password,
      email,
    });
  
    return res.json({"menssage": "Changed password"});
  
});

export default changePasswordRouter;