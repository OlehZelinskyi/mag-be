import Router from "express";
import MessageController from "../controllers/MessageController.js";

const router = Router();

router.post("/", MessageController.sendMessage);

export default router;
