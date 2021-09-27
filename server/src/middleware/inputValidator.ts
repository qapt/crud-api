import { NextFunction, Request, Response } from 'express';
import joi from 'joi';
import { InvalidInput } from './../errors/index';

export const validateInput = (schema: joi.ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body);
        if (error) {
            const errors = error.details.map((err) => err.message);
            next(new InvalidInput(errors));
        }

        next();
    };
};
