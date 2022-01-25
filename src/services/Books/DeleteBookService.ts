import { DeleteResult, getCustomRepository } from "typeorm";
import AppError from "../../errors/AppError";
import BookRepository from "../../repositories/BookRepository";

interface Request {
  id: string;
}

export default class DeleteBookService {
  public async execute({ id }: Request): Promise<DeleteResult> {
    const bookRepository = getCustomRepository(BookRepository);

    const book = await bookRepository.findOne(id);

    if (!book) {
      throw new AppError("Book not found!", 404);
    }
    return bookRepository.delete(id);
  }
}
