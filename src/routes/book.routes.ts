import { Router } from "express";
import { getRepository } from "typeorm";
import Book from "../models/Book";
import CreateBookService from "../services/Books/CreateBookService";
import { bookSchema } from "../models/schemas/BookSchema";
import { validate } from "../middlewares/validations/schema";
import ensureAuth from "../middlewares/AuthenticateUserMiddleware";
import AppError from "../errors/AppError";

const bookRouter = Router();

bookRouter.get("/:id", validate(bookSchema), async (req, res) => {
    const { id } = req.params;
    
    const bookRepository = getRepository(Book);
    
    const book = await bookRepository.findOne({
        where: {
            id,
            closed: true
        }
    });
    
    if (!book) {
        throw new AppError("Book not found", 404)
    }
    
    return res.status(200).json(book);
})

bookRouter.get("/", async (req, res) => {
    const bookRepository = getRepository(Book);

    const books = await bookRepository.find({
        where: {
            closed: true
        }
    });

    return res.status(200).json(books);
})

bookRouter.use(ensureAuth)

bookRouter.post("/", async (req, res) => {
    const {title, price, description} = req.body;

    const bookCreate = new CreateBookService();

    const book = await bookCreate.execute({
        title,
        price,
        description        
    });

    return res.status(201).json(book);    
})

export default bookRouter;