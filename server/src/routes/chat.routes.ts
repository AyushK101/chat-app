import { Router } from "express";
import { authJwt } from "../middlewares/auth.middleware";
import { addNewParticipantInGroupChat, createAGroupChat, createOrGetAOneOnOneChat, deleteGroupChat, deleteOneOnOneChat, getAllUserChats, getAllUsers, getGroupChatDetails, leaveGroupChat, removeParticipantFromGroupChat, renameGroupChat } from "../controllers/chat.controller";

const router = Router()

router.use(authJwt)


router.route('/').get(getAllUserChats)
router.route('/users').get(getAllUsers)
router.route('/c/:receiverId').post(createOrGetAOneOnOneChat)

router
  .route('group')
  .post(createAGroupChat)

router
  .route('/group/:chatId')
  .get(getGroupChatDetails)
  .patch(renameGroupChat)
  .delete(deleteGroupChat)

router.route('group/:chatId/:participantId')
  .post(addNewParticipantInGroupChat)
  .delete(removeParticipantFromGroupChat)

router
  .route('/leave/group/:chatId')
  .post(leaveGroupChat)
  .delete(deleteOneOnOneChat)
export default router