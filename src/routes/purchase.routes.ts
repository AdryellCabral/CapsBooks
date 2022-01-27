import { Router } from "express";
import { getCustomRepository } from "typeorm";
import PurchaseRepository from "../repositories/PurchaseRepository";
import UserRepository from "../repositories/UserRepository";
import CreatePurchaseService from "../services/Purchase/CreatePurchaseService";
import ensureAuth from "../middlewares/AuthenticateUserMiddleware";
import AppError from "../errors/AppError";
import { classToClass } from "class-transformer";
import checkIfAdmAndPurchaseEqualId from "../middlewares/verifications/checkIfAdmAndPurchaseEqualId";
import SendPurchaseMailerService from "../services/Purchase/SendPurchaseMailerService"

const purchaseRouter = Router();

purchaseRouter.use(ensureAuth)

purchaseRouter.post("/", async (req, res) => {
    const userId = req.user.id

    const createPurchase = new CreatePurchaseService();

    const purchase = await createPurchase.execute({        
        userId,    
    });

    const sendPurchaseMailerService = new SendPurchaseMailerService();

    await sendPurchaseMailerService.execute({ 
        purchase,       
        userId,    
    });

    return res.status(201).json(classToClass(purchase));    
})

purchaseRouter.get("/:id", checkIfAdmAndPurchaseEqualId, async (req, res) => {
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

purchaseRouter.get("/", async (req, res) => {
    const id = req.user.id

    const userRepository = getCustomRepository(UserRepository);
    const purchaseRepository = getCustomRepository(PurchaseRepository);

    const user = await userRepository.findOne(id);

    if(!user){
        throw new AppError("User not found");
    }

    if (user.is_adm === false){
        const purchases = await purchaseRepository.find({
            where: {
                closed: true,
                userId: id
            }
        });
    
        return res.status(200).json(classToClass(purchases));
    }

    const purchases = await purchaseRepository.find({
        where: {
            closed: true
        }
    });

    return res.status(200).json(classToClass(purchases));
})

export default purchaseRouter;