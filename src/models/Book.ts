import { 
    Entity,
    Column,
    PrimaryGeneratedColumn, 
    CreateDateColumn, 
    UpdateDateColumn, 
    OneToMany } from "typeorm";
import Review from "./Review";

@Entity("books")
class Book {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    price: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(() => Review, (book) => book.review)
    reviews: Review[];
}

export default Book;
