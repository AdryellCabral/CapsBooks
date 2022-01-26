import { Router } from "express";
import { getRepository, ILike } from "typeorm";
import Book from "../models/Book";
import CreateBookService from "../services/Books/CreateBookService";
import DeleteBookService from "../services/Books/DeleteBookService";
import UpdateBookService from "../services/Books/UpdateBookService";
import checkIfAdm from "../middlewares/verifications/checkIfAdm";
import ensureAuth from "../middlewares/AuthenticateUserMiddleware";
import CreateReviewService from "../services/Review/CreateReviewService";
import { reviewSchema } from "../models/schemas/ReviewSchema";
import { bookSchema } from "../models/schemas/BookSchema";
import { validate } from "../middlewares/validations/schema";
import AppError from "../errors/AppError";
import { classToClass } from "class-transformer";

const bookRouter = Router();

bookRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  const bookRepository = getRepository(Book);

  const book = await bookRepository.findOne(id);

  if (!book) {
    throw new AppError("Book not found", 404);
  }

  return res.status(200).json(book);
});

bookRouter.get("/", async (req, res) => {
    const { title, author } = req.query;

    const bookRepository = getRepository(Book);
    
    if (!title && !author) {    
        const books = await bookRepository.find();
    
        return res.status(200).json(books);
    }    
    
    if (title && !author) {
        const books = await bookRepository.find({
            where: {
                title: ILike(`%${title}%`), 
            }
        });
        
        return res.status(200).json(books);
    }

    if (!title && author) {
        const books = await bookRepository.find({
            where: {
                author: ILike(`%${author}%`), 
            }
        });
        
        return res.status(200).json(books);
    }

    if (title && author) {
        const books = await bookRepository.find({
            where: {
                author: ILike(`%${author}%`),
                title: ILike(`%${title}%`)
            }
        });
        
        return res.status(200).json(books);
    }
})

bookRouter.use(ensureAuth);

bookRouter.post("/:book_id/review", validate(reviewSchema), async (req, res) => {
  const userId = req.user.id;
  const { book_id } = req.params;
  const { comment, review } = req.body;

  const createReview = new CreateReviewService();

  const reviews = await createReview.execute({
    bookId: book_id,
    comment,
    review,
    userId,
  });

  return res.status(201).json(classToClass(reviews));
});

bookRouter.use(checkIfAdm);

bookRouter.post("/", validate(bookSchema), async (req, res) => {
  const { title, price, description, author } = req.body;

  const bookCreate = new CreateBookService();

  const book = await bookCreate.execute({
    title,
    price,
    description,
    author
  });

  return res.status(201).json(book);
});

bookRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const deleteBook = new DeleteBookService();

  await deleteBook.execute({
    id,
  });

  return res.status(204).json({ message: "Book deleted with success" });
});

bookRouter.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, price, author } = req.body;

  const updateBook = new UpdateBookService();

    const book = await updateBook.execute({
        id,
        title,
        price,
        description,
        author        
    });

  return res.status(200).json(book);
});

export default bookRouter;
