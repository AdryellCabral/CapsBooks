import { EntityRepository, Repository } from "typeorm";
import Book from "../models/Book";

@EntityRepository(Book)
class BookRepository extends Repository<Book> {
  public async findBookById(book_id: string): Promise<Book | undefined> {
    const book = await this.findOne({
      where: {
        book_id,
      },
    });
    return book;
  }
}

export default BookRepository;
