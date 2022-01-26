import { DeleteResult, getRepository } from "typeorm";
import Book from "../../models/Book";
import AppError from "../../errors/AppError";

interface Request {
  id: string;
}

export default class DeleteBookService {
  public async execute({ id }: Request): Promise<DeleteResult> {
    const bookRepository = getRepository(Book);

    const book = await bookRepository.findOne(id);

    if (!book) {
      throw new AppError("Book not found!", 404);
    }
    
    return bookRepository.delete(id);
  }
}
