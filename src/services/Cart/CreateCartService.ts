import { getCustomRepository, getRepository } from "typeorm";
import Order from "../../models/Order";
import Book from "../../models/Book";
import OrderBook from "../../models/OrderBook";
import AppError from "../../errors/AppError";
import CartRepository from "../../repositories/CartRepository";

interface Request {
    books_ids: string[];
    closed: boolean;
    userId: string;
}

class CreateCartService {
    public async execute({ books_ids, closed, userId }: Request): Promise<Order> {
        const cartRepository = getCustomRepository(CartRepository);
        const orderBookRepository = getRepository(OrderBook);
        const bookRepository = getRepository(Book);
        
        const books = await bookRepository.findByIds(books_ids)

        if (!books[books_ids.length -1]){
            throw new AppError("Invalid list of books")
        };

        let cart = await cartRepository.findCart(userId);

        if (!cart) {
            cart = cartRepository.create({
                closed,
                userId
            })    
            await cartRepository.save(cart);
        }
        
        books_ids.forEach(async (book_id) => {
            const orderProduct = orderBookRepository.create({
                orderId: cart?.id,
                bookId: book_id,                
            });

            await orderBookRepository.save(orderProduct)
        });

        const checkedCart = await cartRepository.findCart(userId);

        if(!checkedCart){
            throw new AppError("Cart not found");
        }

        return checkedCart;
    }
}

export default CreateCartService;
