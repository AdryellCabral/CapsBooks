import { EntityRepository, Repository } from "typeorm";
import Book from "../models/Book";

@EntityRepository(Book)
class BookRepository extends Repository<Book> {
  public async findBookById(id: string): Promise<Book | undefined> {
    const book = await this.findOne({
      where: {
        id,
      },
    });
    return book;
  }
}

export default BookRepository;
