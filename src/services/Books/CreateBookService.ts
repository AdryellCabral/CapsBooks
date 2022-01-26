import { getRepository } from "typeorm";
import Book from "../../models/Book";

interface Request {
    title: string;
    price: number;
    description: string;    
    author: string;
}

class CreateBookService {
    public async execute({title, price, description, author}: Request): Promise<Book> {
        const bookRepository = getRepository(Book);

        const book = bookRepository.create({
            title,
            price,
            description,
            author
        })

        await bookRepository.save(book);

        return book;
    }
}

export default CreateBookService;