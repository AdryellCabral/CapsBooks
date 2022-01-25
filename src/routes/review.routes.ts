import { Router } from "express";
import ensureAuth from "../middlewares/AuthenticateUserMiddleware";
import onlyAdm from "../middlewares/verifications/onlyAdmMiddleware";

import CreateReviewService from "../services/Review/CreateReviewService";
import RetrieveReviewService from "../services/Review/RetrieveReviewService";
import DeleteReviewService from "../services/Review/DeleteReviewService";
import ListReviewService from "../services/Review/ListReviewService";

const reviewRouter = Router();

// reviewRouter.get("/review", async (req, res) => {
//   const listReview = new ListReviewService();
//   const reviews = await listReview.execute();
//   return res.json(reviews);
// });

reviewRouter.use(ensureAuth);

reviewRouter.get("/review/:review_id", async (req, res) => {
  const id = req.params.review_id;

  const retrieveReview = new RetrieveReviewService();
  const reviews = await retrieveReview.execute({ id });
  return res.json(reviews);
});

reviewRouter.post("/:book_id/review", async (req, res) => {
  const user_id = req.user.id;
  const { book_id } = req.params;
  const { comment, review } = req.body;

  const createReview = new CreateReviewService();

  const reviews = await createReview.execute({
    book_id,
    comment,
    review,
    user_id,
  });

  return res.status(201).json(reviews);
});

reviewRouter.delete(
  "/:book_id/review/:review_id",
  onlyAdm,
  async (req, res) => {
    const { review_id } = req.params;

    const deleteUser = new DeleteReviewService();

    await deleteUser.execute({
      id: review_id,
    });

    return res.json({ message: "Review deleted with success" });
  }
);

export default reviewRouter;
