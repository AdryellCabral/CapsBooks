import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Exclude } from "class-transformer";
import Book from "./Book";
import User from "./User";

@Entity("orders")
class Order {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  closed: boolean;

  @ManyToOne(() => User, (user) => user)
  user: User;

  @Exclude()
  @Column()
  userId: string;

  @ManyToMany(() => Book) @JoinTable()
  books: Book[];
}

export default Order;
