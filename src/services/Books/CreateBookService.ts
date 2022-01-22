import { getRepository } from "typeorm";
import Book from "../../models/Book";

interface Request {
    title: string;
    price: number;
    description: string;    
}

class CreateBookService {
    public async execute({title, price, description}: Request): Promise<Book> {
        const bookRepository = getRepository(Book);

        const book = bookRepository.create({
            title,
            price,
            description
        })

        await bookRepository.save(book);

        return book;
    }
}

export default CreateBookService;