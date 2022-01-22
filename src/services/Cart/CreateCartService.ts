import { getCustomRepository, getRepository } from "typeorm";
import Book from "../../models/Book";
import Order from "../../models/Order";
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
    const bookRepository = getRepository(Book);

    const books: Book[] = [];

    books_ids.forEach(async (bookId) => {
      const [book] = await bookRepository
        .find({
          where: {
            id: bookId,
          },
        })
        .catch((err) => {
          throw new AppError("Invalid list of books");
        });

      books.push(book);
    });

    let cart = await cartRepository.findCart(userId);

    if (!cart) {
      cart = cartRepository.create({
        closed,
        userId,
        books: books,
      });

      await cartRepository.save(cart);
    } else {
      cart.books.concat(books);

      await cartRepository.save(cart);
    }

    const [updatedCart] = await cartRepository.find({
      where: {
        userId: userId,
      },
    });

    return updatedCart;
  }
}

export default CreateCartService;
