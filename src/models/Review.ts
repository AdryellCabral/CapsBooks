import { 
    Entity,
    Column,
    PrimaryGeneratedColumn, 
    CreateDateColumn, 
    ManyToOne } from "typeorm";
import User from "./User";
import Book from "./Book";

@Entity("reviews")
class Review {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    title: string;

    @Column()
    comment: string;

    @Column()
    review: number;

    @CreateDateColumn()
    created_at: Date;

    @Column()
    userId: string;

    @ManyToOne(() => User)
    user: User;

    @ManyToOne(() => Book)
    book: Book;
}

export default Review;

