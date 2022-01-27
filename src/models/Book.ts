import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import Review from "./Review";
import { Exclude } from "class-transformer";

@Entity("books")
class Book {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  description: string;

  @Column({type: "decimal", precision: 5, scale: 2})
  price: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Exclude()
  @OneToMany(() => Review, (review) => review.book, { eager: true })
  reviews: Review[];
}

export default Book;
