import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
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

  @Column()
  user_id: string;

  @Column()
  book_id: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Book, { onDelete: "CASCADE" })
  book: Book;

  @ManyToOne(() => User, { onDelete: "CASCADE" })
  user: User;
}

export default Review;
