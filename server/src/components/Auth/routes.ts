import { Router } from 'express';
import * as UserController from './controller';
import { validateLoginInput, validateRegisterInput } from './validator';
import { isAuth } from './../../middleware/isAuth';

const router: Router = Router();

router.post('/register', validateRegisterInput, UserController.registerUser);
router.post('/login', validateLoginInput, UserController.loginUser);
router.get('/', UserController.user);
router.get('/logout', isAuth, UserController.logoutUser);

export default router;
