import { Router } from 'express';
import { getCurrentUser, signup, signupDummy } from '../controllers/user.controllers';
import { authJwt } from '../middlewares/auth.middleware';

const router = Router();

router.route('/signup').post(signup)
router.route('/dummy').post(signupDummy)
router.route('/get').get( authJwt, getCurrentUser )

export default router