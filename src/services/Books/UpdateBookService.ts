import { getCustomRepository } from "typeorm";
import AppError from "../../errors/AppError";
import Book from "../../models/Book";
import BookRepository from "../../repositories/BookRepository";

interface Request {
  id: string;
  title: string;
  price: number;
  description: string;
  author: string;
}

export default class UpdateBookService {
  public async execute({
    id,
    title,
    price,
    description,
    author
  }: Request): Promise<Book> {
    const bookRepository = getCustomRepository(BookRepository);
    const book = await bookRepository.findOne(id);

    if (!book) {
      throw new AppError("Book not found!", 404);
    }

    title ? (book.title = title) : book.title;
    price ? (book.price = price) : book.price;
    description ? (book.description = description) : book.description;
    author ? (book.author = author) : book.author;

    await bookRepository.save(book);

    return book;
  }
}
