import { Router } from 'express';
import * as ProfileController from './controller';
import { isAuth } from './../../middleware/isAuth';
import { validateProfileInput } from './validator';

const router = Router();

router.get('/me', isAuth, ProfileController.getUserProfile);
router.get('/me/likes', isAuth, ProfileController.getUserLikedPosts);
router.put(
    '/profile',
    isAuth,
    validateProfileInput,
    ProfileController.createOrUpdateUserProfile
);

export default router;
