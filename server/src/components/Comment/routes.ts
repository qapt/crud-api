import { Router } from 'express';
import * as CommentController from './controller';
import { isAuth } from './../../middleware/isAuth';
import { validateCommentInput } from './validator';

const router = Router();

router.post(
    '/:postId/comment',
    isAuth,
    validateCommentInput,
    CommentController.createComment
);

export default router;
