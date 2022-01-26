import { getRepository } from "typeorm";
import { Request, Response, NextFunction } from "express";
import Book from "../../models/Book";
import AppError from "../../errors/AppError";

async function findBooks (
    req:Request,
    res: Response,
    next: NextFunction 
    ): Promise<void> {
        const books_ids = req.body.books_ids;

        const bookRepository = getRepository(Book);

        for (let i = 0; i < books_ids.length; i++) {
            const book = await bookRepository.findOne(books_ids[i]);
            
            if(!book){
                throw new AppError("Invalid list of books", 400);
            }
        }
        next();
}

export default findBooks;
