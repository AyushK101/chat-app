import { Router } from 'express';
import { getCurrentUser, logout, signup, signupDummy } from '../controllers/user.controller';
import { authJwt } from '../middlewares/auth.middleware';

const router = Router();

router.route('/signup').post(signup)
router.route('/dummy').post(signupDummy)
router.route('/get').get( authJwt, getCurrentUser )
router.route('/logout').get(logout)

export default router