import express from "express";
import { login, signUp } from "../controllers/auth.controllers";
import { validateReqBody } from "../middlewares/validator.middlewares";
import {
  createUserBodySchema,
  loginUserBodySchema,
} from "../schema/user.schema";
const router = express.Router();

console.log(`came to auth routes`);

router.post("/signup", validateReqBody(createUserBodySchema), signUp);
router.post("/login", validateReqBody(loginUserBodySchema), login);

export default router;
