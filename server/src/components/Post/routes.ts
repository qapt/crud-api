import { Router } from 'express';
import * as PostController from './controller';
import { isAuth } from './../../middleware/isAuth';
import { validateCreatePostInput, validateUpdatePostInput } from './validator';

const router = Router();

// TODO: :postId instead of :id
router.get('/', PostController.getAllPosts);
router.get('/:id', PostController.getPostById);
router.post('/', isAuth, validateCreatePostInput, PostController.createPost);
router.patch(
    '/:id',
    isAuth,
    validateUpdatePostInput,
    PostController.updatePost
);
router.delete('/:id', isAuth, PostController.deletePost);

router.put('/:id/like', isAuth, PostController.likePost);

export default router;
