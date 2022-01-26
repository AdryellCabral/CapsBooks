import { Router } from "express";
import ensureAuth from "../middlewares/AuthenticateUserMiddleware";
import onlyAdm from "../middlewares/verifications/onlyAdmMiddleware";
import RetrieveReviewService from "../services/Review/RetrieveReviewService";
import DeleteReviewService from "../services/Review/DeleteReviewService";
import { classToClass } from "class-transformer";
import checkIfAdmAndReviewEqualId from "../middlewares/verifications/checkIfAdmAndReviewEqualId";
import Review from "../models/Review";
import checkIfAdm from "../middlewares/verifications/checkIfAdm";
import ListReviewService from "../services/Review/ListReviewService";

const reviewRouter = Router();

reviewRouter.use(ensureAuth, checkIfAdmAndReviewEqualId);

reviewRouter.get("/:review_id", async (req, res) => {
  const id = req.params.review_id;

  const retrieveReview = new RetrieveReviewService();

  const review = await retrieveReview.execute({ id });

  return res.status(200).json(classToClass(review));
});

reviewRouter.delete("/:review_id", async (req, res) => {
    const id = req.params.review_id;

    const deleteUser = new DeleteReviewService();

    await deleteUser.execute({
      id,
    });

    return res.status(204).json({ message: "Review deleted with success" });
  }
);

reviewRouter.use(checkIfAdm);

reviewRouter.get("/", async (req, res) => {
  const listReview = new ListReviewService();

  const reviews = await listReview.execute();

  return res.status(200).json(classToClass(reviews));
});

export default reviewRouter;
