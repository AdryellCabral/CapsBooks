import { getCustomRepository, getRepository } from "typeorm";
import Order from "../../models/Order";
import AppError from "../../errors/AppError";
import CartRepository from "../../repositories/CartRepository";
import PurchaseRepository from "../../repositories/PurchaseRepository";

interface Request {
    userId: string;
}

class CreatePurchaseService {
    public async execute({ userId }: Request): Promise<Order> {
        const cartRepository = getCustomRepository(CartRepository);
        const buyRepository = getCustomRepository(PurchaseRepository);

        let cart = await cartRepository.findCart(userId);

        if (!cart) {
            throw new AppError("No cart was found", 404);
        }

        if (cart.books.length === 0) {
            throw new AppError("Cart is empty", 422);
        }

        cart.closed = true;

        await cartRepository.save(cart);

        const purchase = await buyRepository.findOne({
            where: {
                id: cart.id,
            }
        });

        if(!purchase) {
            throw new AppError("Buy not found", 404);
        }

        return purchase;
    }
}

export default CreatePurchaseService;