import { EntityRepository, Repository } from "typeorm";
import Order from "../models/Order";

@EntityRepository(Order)
class PurchaseRepository extends Repository<Order> {
    public async findPurchase(id:string): Promise<Order[] | undefined> {
        const order = await this.find({
            where: {
                userId: id,
                closed: true,                
            }
        });
        return order;
    }
}

export default PurchaseRepository;