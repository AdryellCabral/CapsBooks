import { Router } from "express";
import { getCustomRepository } from "typeorm";
import CreateCartService from "../services/Cart/CreateCartService";
import CartRepository from "../repositories/CartRepository";
import { cartSchema } from "../models/schemas/CartSchema";
import { validate } from "../middlewares/validations/schema";
import ensureAuth from "../middlewares/AuthenticateUserMiddleware";
import DeleteBookInCartService from "../services/Cart/DeleteProductInCartService";
import checkIfAdmAndEqualId from "../middlewares/verifications/checkIfAdmAndEqualId";
import AppError from "../errors/AppError";
import { classToClass } from "class-transformer";

const cartRouter = Router();

cartRouter.use(ensureAuth)

cartRouter.post("/", validate(cartSchema), async (req, res) => {
    const { books_ids } = req.body;
    const userId = req.user.id

    const createCart = new CreateCartService();

    const cart = await createCart.execute({
        books_ids,
        userId,
        closed: false        
    });

    return res.status(201).json(classToClass(cart));    
})

cartRouter.get("/:id", checkIfAdmAndEqualId, async (req, res) => {
    const { id } = req.params;
        
    const cartRepository = getCustomRepository(CartRepository);
    
    const cart = await cartRepository.findOne({
        where: {
            id, 
            closed: false,
        }
    });
    
    if (!cart) {
        throw new AppError("Cart not found", 404)
    }
    
    return res.status(200).json(classToClass(cart));
})

cartRouter.delete("/:bookId", checkIfAdmAndEqualId, async (req, res) => {
    const { bookId } = req.params;
    const userId = req.user.id;

    const cartToDeleteBook = new DeleteBookInCartService();

    const cart = await cartToDeleteBook.execute({
        bookId,
        userId,    
    });
        
    return res.status(200).json(classToClass(cart));
})

// cartRouter.use(checkIfAdm);

cartRouter.get("/", async (req, res) => {
    const cartRepository = getCustomRepository(CartRepository);

    const carts = await cartRepository.find({
        where: {
            closed: false,
        }
    });

    return res.status(200).json(classToClass(carts));
})

export default cartRouter;