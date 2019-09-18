import { Router } from "express";

import { signUpUser } from "../controllers/auth/sign-up.controller";
import { verifyUser } from "../controllers/auth/user-verify.controller";
import { signinValidator } from "../utils/validators/auth/signin.validator";
import { signupValidator } from "../utils/validators/auth/signup.validator";
import { signInUser } from "../controllers/auth/sign-in.controller";

const router = Router();

router.post("/sign-in", signinValidator, signInUser);
router.post("/sign-up", signupValidator, signUpUser);
router.get("/sign-up/verify", verifyUser);

export default router;
