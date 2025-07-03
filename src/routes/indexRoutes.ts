import { Router } from "express";

import {
  getAllUsers,
  getCreateNewMessageForm,
  getUserById,
  postNewMessage,
} from "@/controllers/indexController.js";
import { messageSchema } from "@/validators/messageSchema.js";

export const router = Router();

router.get("/", getAllUsers);
router.get("/new", getCreateNewMessageForm);
router.post("/new", messageSchema, postNewMessage);
router.get("/messages/:messageId", getUserById);
