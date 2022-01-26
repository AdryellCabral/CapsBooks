import { getCustomRepository, getRepository, getConnection} from "typeorm";
import Order from "../../models/Order";
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

        let cart = await cartRepository.findCart(userId);

        if (!cart) {
            cart = cartRepository.create({
                closed,
                userId
            })    
            await cartRepository.save(cart);
        }
        
        for (let i = 0; i < books_ids.length; i++) {
            // Outra forma de criar, porém ficou mais lenta

            // await getConnection()
            // .createQueryBuilder()
            // .insert()
            // .into(OrderBook)
            // .values(
            //     { 
            //      orderId: cart?.id,
            //      bookId: books_ids[i], 
            //     } 
            // )
            // .execute();

            const orderProduct = orderBookRepository.create({
                orderId: cart?.id,
                bookId: books_ids[i],                
            });

            await orderBookRepository.save(orderProduct);
        }               

        const checkedCart = await cartRepository.findCart(userId);

        if(!checkedCart){
            throw new AppError("Cart not found", 404);
        }
        return checkedCart;
    }
}

export default CreateCartService;