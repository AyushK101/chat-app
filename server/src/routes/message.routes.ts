import { Router } from "express";
import { createMessage, getAllMessagesOfAChat } from "../controllers/message.controller";
import { authJwt } from "../middlewares/auth.middleware";

const router = Router()


router.route('/').post( authJwt, createMessage);
router.route('/:chatId').get( authJwt, getAllMessagesOfAChat)
 


export default router
