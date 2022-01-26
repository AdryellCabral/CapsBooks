import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import { Exclude } from "class-transformer";
import Book from "./Book";
import User from "./User";

@Entity("reviews")
class Review {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  review: number;

  @Column()
  comment: string;

  @Exclude()
  @Column()
  userId: string;

  @Exclude()
  @Column()
  bookId: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Book, (book) => book, { onDelete: "CASCADE" })
  book: Book;

  @ManyToOne(() => User, (user) => user, { onDelete: "CASCADE" })
  user: User;
}

export default Review;
