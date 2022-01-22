import { Request, Response, NextFunction } from "express";
import AppError from "../../errors/AppError";
import { AnyObjectSchema,} from 'yup';

export const validate = (schema:AnyObjectSchema) => async (
  req:Request, 
  res:Response, 
  next:NextFunction): Promise<void> => {
    const resource = req.body;

    await schema.validate(resource, {abortEarly: false})
    .catch(({errors}) => {
        throw new AppError(errors)
    })

    next();    
  };