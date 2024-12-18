import { Router } from "express";
import { authJwt } from "../middlewares/auth.middleware";

const router = Router()


router.use(authJwt)



export default router