import { getCustomRepository } from "typeorm";
import Order from "../../models/Order";
import AppError from "../../errors/AppError";
import CartRepository from "../../repositories/CartRepository";
import PurchaseRepository from "../../repositories/PurchaseRepository";
import UserRepository from "../../repositories/UserRepository";
import SendEmailService from "../../services/Mailer/mailer"

interface Request {
    purchase: Order;
    userId: string
}

class SendPurchaseMailerService {
    public async execute({ purchase, userId }: Request): Promise<void> {
        const cartRepository = getCustomRepository(CartRepository);
        const buyRepository = getCustomRepository(PurchaseRepository);

        const createUser = new SendEmailService();
        const userRepository = getCustomRepository(UserRepository);
      
        const user = await userRepository.findOne(userId);
        if ( !user ){
          throw new AppError("Not found any user with this id.", 404);
        }

        const purchase_books = purchase.books
        let books: string = ''
        const len = books.length

        for (let i=0; i < purchase_books.length; i++ ) {
            let book = purchase_books[i].book
            let html_data = `"${book.title}" por R$${book.price} ;  `
            books+=html_data
        }
        console.log("purchase",books)

        await createUser.execute(user.email, "report", {
            name: user.name ,
            totalCost: purchase.getTotal().toFixed(2),
            books
        });

    }
}

export default SendPurchaseMailerService;

