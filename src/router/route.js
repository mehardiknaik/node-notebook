import { Router } from "express";
import * as controller from "../controller/index.js"
import { auth } from "../middleware/auth.js";
const router = Router();

// Post Method
router.route("/register").post(controller.register);
router.route("/login").post(controller.login);
router.route("/addNote").post(auth, controller.addNote);
router.route("/deleteNote").post(auth, controller.deleteNote);
router.route("/updateNote").post(auth, controller.updateNote);

// Get Method
router.route("/note").get(auth, controller.note);

// Test API Routes
router.route("/test").all(controller.test);

export default router;
