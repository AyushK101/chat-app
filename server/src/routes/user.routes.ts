import { Router } from 'express';
import { allUsers, getCurrentUser, logout, signup } from '../controllers/user.controller';
import { authJwt } from '../middlewares/auth.middleware';

const router = Router();

router.route('/signup').post(signup)
// router.route('/dummy').post(signupDummy)
router.route('/get').get( authJwt, getCurrentUser )
router.route('/logout').get(logout)

// chats & messages

router.route('/users').get( authJwt, allUsers)

export default router