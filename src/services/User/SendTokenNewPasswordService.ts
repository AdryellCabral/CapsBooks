import nodemailer from "nodemailer";
import path from "path";
import AppError from "../../errors/AppError";
import hbs from "nodemailer-express-handlebars";

interface Request {
    email: string;
    token: string;
    name: string;
}

class SendTokenNewPasswordService {
    public async execute({
        email, token, name
    }: Request): Promise<void> {
        const transporter = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "c8d0596470f48c",
              pass: "6caa340c595161"
            }
        });

        transporter.use(
            "compile", hbs({
                viewEngine: {
                    partialsDir: path.resolve(__dirname, "..", "..", "views"),
                    defaultLayout: undefined,
                },
                viewPath: path.resolve(__dirname, "..", "..", "views"),                
            })
        );
        const mailOptions = {
            from: "nao-responda@kenzie-market.com.br",
            to: email,
            subject: "Definição de nova senha",
            template: "recover",
            context: {
                name,
                token
            }
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if(error){
                throw new AppError("Error while sending the email", 500)
            }
        });
    }
}

export default SendTokenNewPasswordService;