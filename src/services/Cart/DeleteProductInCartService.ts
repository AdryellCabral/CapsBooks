import { getCustomRepository, getRepository } from "typeorm";
import Order from "../../models/Order";
import Book from "../../models/Book";
import AppError from "../../errors/AppError";
import CartRepository from "../../repositories/CartRepository";

interface Request {
    bookId: string;
    userId: string;
}

class DeleteBookInCartService {
    public async execute({ bookId, userId }: Request): Promise<Order> {
        const cartRepository = getCustomRepository(CartRepository);
        const bookRepository = getRepository(Book);

        const book = await bookRepository.findOne(bookId);

        if (!book){
            throw new AppError("Book not found");
        }

        const [checkedBook] = await bookRepository.find({
            where : {
                id: bookId
            }
        });

        const cart = await cartRepository.findCart(userId);

        if (!cart) {
            throw new AppError("Cart not found");
        }

        const index = cart.books.findIndex((checkedBook) => {
            bookId = checkedBook.id;
        })
       
        cart.books.splice(index, 1);

        await cartRepository.save(cart);
        
       const [updatedCart] = await cartRepository.find({
           where: {
               userId: userId,
           }
       });
       
       return updatedCart;
    }
}

export default DeleteBookInCartService;