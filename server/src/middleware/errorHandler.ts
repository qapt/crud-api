import { NextFunction, Request, Response } from 'express';
import { ErrorResponse, NotFound } from '../errors/';

export const notFound = (req: Request, res: Response, next: NextFunction) => {
    next(new NotFound(['Resource not found']));
};

export const errorHandlerDev = (
    err: ErrorResponse,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.status(err.statusCode || 500).json({
        error: {
            timestamp: err.timestamp,
            status: err.statusCode,
            type: err.type,
            message: err.message,
            details: err.details,
        },
        //stack: err.stack,
    });
};

// export const errorHandlerProd = (
//     err: ErrorResponse,
//     req: Request,
//     res: Response,
//     next: NextFunction
// ) => {
//     const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
//     res.status(statusCode).json({
//         errorCode: statusCode,
//         message: err.message,
//     });
// };
