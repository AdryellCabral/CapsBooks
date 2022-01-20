import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import Book from "./Book";
import Order from "./Order";

@Entity("order_books")
class OrderBook {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Order)
  order: Order;

  @ManyToOne(() => Book)
  book: Book;

  @Column()
  order_id: string;

  @Column()
  book_id: string;
}

export default OrderBook;
