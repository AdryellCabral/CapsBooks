import { getCustomRepository, getRepository } from "typeorm";
import Order from "../../models/Order";
import Book from "../../models/Book";
import OrderBook from "../../models/OrderBook";
import UserRepository from "../../repositories/UserRepository";
import AppError from "../../errors/AppError";
import CartRepository from "../../repositories/CartRepository";

interface Request {
    bookId: string;
    email: string;
    idLogged: string;
}

class DeleteBookInCartService {
    public async execute({ bookId, email, idLogged }: Request): Promise<Order> {
        const cartRepository = getCustomRepository(CartRepository);
        const orderBookRepository = getRepository(OrderBook);
        const bookRepository = getRepository(Book);
        const userRepository = getCustomRepository(UserRepository);

        const user = await userRepository.findByEmail(email);

        if(!user){
            throw new AppError("User not found", 404);
        }

        const userLogged = await userRepository.findOne(idLogged);

        if(!userLogged){
            throw new AppError("User not found", 404);
        }
        
        const cart = await cartRepository.findCart(user.id);
       
        if (!cart) {
            throw new AppError("Cart not found", 404);
        }

        if ( cart.userId !== userLogged.id && userLogged.is_adm === false) {
            throw new AppError("Missing admin permissions", 401)
        }

        const book = await bookRepository.findOne(bookId);

        if (!book){
            throw new AppError("Book not found in store", 404);
        }
              
        const bookToDeleted = cart.books.find((orderBook) => 
           orderBook.bookId === bookId        
        );               
        
        if(!bookToDeleted){
            throw new AppError("Book not found in cart", 404);
        }
    
        await orderBookRepository.delete(bookToDeleted.id);
        
        const updatedCart = await cartRepository.findCart(user.id);

        if (!updatedCart) {
            throw new AppError("Cart not found", 404);
        }
       
       return updatedCart;
    }
}

export default DeleteBookInCartService;