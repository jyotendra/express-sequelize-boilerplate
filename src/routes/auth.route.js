import {Router} from "express";

import { createNewUser } from "../controllers/auth/sign-up/sign-up.controller";
import { userValidators } from "../validators/auth/user.validator";
import { signInUser } from "../controllers/auth/sign-in/sign-in.controller";

const router = Router();

router.post("/sign-in", userValidators, signInUser);
// router.post("/sign-up", createNewUser);

export default router;