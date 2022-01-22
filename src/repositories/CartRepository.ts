import { EntityRepository, Repository } from "typeorm";
import Order from "../models/Order";

@EntityRepository(Order)
class CartRepository extends Repository<Order> {
    public async findCart(id:string): Promise<Order | undefined> {
        const order = await this.findOne({
            where: {
                userId: id,
                closed: false,                
            }
        });
        return order;
    }
}

export default CartRepository;

