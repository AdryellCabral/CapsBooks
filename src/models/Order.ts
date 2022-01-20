import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import User from "./User";

@Entity("orders")
class Order {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  closed: boolean;

  @ManyToOne(() => User, (user) => user)
  user: User;

  @Column()
  user_id: string;
}

export default Order;
