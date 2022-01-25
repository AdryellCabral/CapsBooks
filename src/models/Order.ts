import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Exclude, Expose } from "class-transformer";
import User from "./User";
import OrderBook from "./OrderBook";

@Entity("orders")
class Order {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  
  @Exclude()
  @Column()
  closed: boolean;

  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user)
  user: User;

  @OneToMany(() => OrderBook, (orderBook) => orderBook.order, {eager: true})
  books: OrderBook[];

  @Expose({name: "total"})
  getTotal(): number {
      const total = this.books.reduce((
          acc, actual) => acc + Number(actual.book.price), 0
          );
      return Number(total.toFixed(2));
  }
}

export default Order;
