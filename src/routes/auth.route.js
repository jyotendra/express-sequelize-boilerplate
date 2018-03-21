import {Router} from "express";

// import { createNewUser } from "../controllers/auth/sign-up.controller";
import { signinValidator } from "../validators/auth/signin.validator";
import { signInUser } from "../controllers/auth/sign-in.controller";

const router = Router();

router.post("/sign-in", signinValidator, signInUser);
// router.post("/sign-up", createNewuser);

export default router;