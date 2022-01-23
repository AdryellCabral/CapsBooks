import { Router } from "express";
import { getCustomRepository } from "typeorm";
import PurchaseRepository from "../repositories/PurchaseRepository";
import CreatePurchaseService from "../services/Purchase/CreatePurchaseService";
import ensureAuth from "../middlewares/AuthenticateUserMiddleware";
import AppError from "../errors/AppError";
import { classToClass } from "class-transformer";
import checkIfAdmAndEqualId from "../middlewares/verifications/checkIfAdmAndEqualId";

const purchaseRouter = Router();

purchaseRouter.use(ensureAuth)

purchaseRouter.post("/", async (req, res) => {
    const userId = req.user.id

    const createPurchase = new CreatePurchaseService();

    const purchase = await createPurchase.execute({        
        userId,    
    });

    return res.status(201).json(classToClass(purchase));    
})

purchaseRouter.get("/:id", checkIfAdmAndEqualId, async (req, res) => {
    const { id } = req.params;
    
    const purchaseRepository = getCustomRepository(PurchaseRepository);
    
    const purchase = await purchaseRepository.findOne({
        where: {
            id,
            closed: true
        }
    });
    
    if (!purchase) {
        throw new AppError("Purchase not found", 404)
    }
    
    return res.status(200).json(classToClass(purchase));
})

// cartRouter.use(checkIfAdm);

purchaseRouter.get("/", async (req, res) => {
    const purchaseRepository = getCustomRepository(PurchaseRepository);

    const purchases = await purchaseRepository.find({
        where: {
            closed: true
        }
    });

    return res.status(200).json(classToClass(purchases));
})

export default purchaseRouter;