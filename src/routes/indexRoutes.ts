import {
  getMessages,
  getCreateForm,
  postNewMessage,
  getMessageById,
} from "../controllers/indexController.js";
import { Router } from "express";
import { messageSchema } from "../validators/messageSchema.js";

export const router = Router();

router.get("/", getMessages);
router.get("/new", getCreateForm);
router.post("/new", messageSchema, postNewMessage);
router.get("/messages/:messageId", getMessageById);
