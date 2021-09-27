import { Router } from 'express';

import authRoutes from '../components/Auth/routes';
import postRoutes from '../components/Post/routes';
import profileRoutes from '../components/Profile/routes';
import commentRoutes from '../components/Comment/routes';

const router = Router();

router.use('/accounts', authRoutes);
router.use('/users', profileRoutes);
router.use('/posts', postRoutes);
router.use('/posts', commentRoutes);

export default router;
