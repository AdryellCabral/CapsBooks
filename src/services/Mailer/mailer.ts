import nodemailer from "nodemailer";
import path from "path";
import AppError from "../../errors/AppError";
import hbs from "nodemailer-express-handlebars";

interface RequestReport {
  name: string;
  totalCost: string;
  books: string;
}
interface RequestChangePassword {
  name: string;
  token: string;
}
export default class SendEmailService {
  public async execute(
    email:string,
    mailerType:string,
    obj: RequestReport | RequestChangePassword
    ): Promise<void> {

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false,
        auth: {
          user: process.env.EMAIL_AUTH_USER,
          pass: process.env.EMAIL_AUTH_PASS
        },
        tls: {
          rejectUnauthorized: false,
        },
      });
    transport.use(
        "compile",
        hbs({
          viewEngine: {
            partialsDir: path.resolve(__dirname, "..", "..", "views"),
            defaultLayout: undefined,
          },
          viewPath: path.resolve(__dirname, "..", "..", "views"),
        })
      );
      
      let subject: string;
      if (mailerType === "report") {
        subject = "Notificação de compra na CapsBook "
      }else{
        subject = "token para alterar email."
      }
      
      const mailOptions = {
        from: "caps-Book@CapsBook.com",
        to: email,
        subject: subject,
        template: mailerType,
        context: obj,
      };
     
      const mailerSend = await transport.sendMail(mailOptions, (error, info) => {
        if (error) {
          throw new AppError("Error while sending the email", 500);
        }
  
        console.log(info);
      });
      
      
  }
}
