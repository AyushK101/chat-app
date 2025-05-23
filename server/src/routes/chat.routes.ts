import { Router } from "express";
import { accessChat, chatHealth, createGroupChat, fetchChat, addToGroup, groupRemove, renameGroupChat } from "../controllers/chat.controller";
import { authJwt } from "../middlewares/auth.middleware";

const router = Router()


router.route('/health').get(chatHealth)

router.route('/').get( authJwt, fetchChat )
router.route('/').post( authJwt, accessChat );

router.route('/group').post( authJwt, createGroupChat )
router.route('/group').put( authJwt, renameGroupChat )
router.route('/groupremove').put( authJwt, groupRemove )  
router.route('/add').put( authJwt, addToGroup )  






export default router;

