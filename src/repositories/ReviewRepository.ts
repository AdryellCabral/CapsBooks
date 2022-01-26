import { EntityRepository, Repository } from "typeorm";
import Review from "../models/Review";

@EntityRepository(Review)
class ReviewRepository extends Repository<Review> {
  public async findByUserIdAndBookId(
    userId: string,
    bookId: string
  ): Promise<Review | undefined> {
    const review = await this.findOne({
      where: {
        userId,
        bookId
      },
    });
    return review;
  }

  public async findById(id: string): Promise<Review | undefined> {
    const review = await this.findOne({
      where: {
        id,
      },
    });
    return review;
  }
}

export default ReviewRepository;
