import { NextFunction, Request, Response } from 'express';
import * as CommentService from './service';
import { AUTH_TOKEN } from '../../utils/constants';

export const createComment = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { content } = req.body;
    const { postId } = req.params;
    const userId = req.signedCookies[AUTH_TOKEN];

    const commentToBeCreated: CommentInput = {
        content,
        postId,
        userId,
    };

    try {
        const createdComment = await CommentService.createComment(
            commentToBeCreated
        );
        res.status(201).json({
            message: 'Comment created successfully',
            comment: createdComment,
        });
    } catch (error) {
        next(error);
    }
};
