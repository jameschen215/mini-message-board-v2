import { NextFunction, Request, Response } from "express";
import { matchedData, validationResult } from "express-validator";

import { query } from "@/db/index.js";
import { MessageType } from "@/types/message.js";
import { CustomNotFoundError } from "@/errors/CustomNotFoundError.js";

export async function getAllUsers(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { rows } = await query("SELECT * FROM messages");
    res.render("index", { messages: rows, title: "Messages" });
  } catch (error) {
    next(error);
  }
}

export async function getUserById(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { messageId } = req.params;

  try {
    const { rows } = await query("SELECT * FROM messages WHERE id = $1", [
      messageId,
    ]);
    if (!rows[0]) {
      throw new CustomNotFoundError("Message Not Found");
    }
    const message = rows[0] as MessageType;

    res.render("message", { title: "Message", message });
  } catch (error) {
    next(error);
  }
}

export function getCreateNewMessageForm(_req: Request, res: Response) {
  res.render("createForm", {
    title: "Create new message",
    errors: null,
    data: null,
  });
}

export async function postNewMessage(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const errors = validationResult(req);
  console.log(errors.mapped());
  if (!errors.isEmpty()) {
    res.status(400).render("createForm", {
      title: "Create new message",
      errors: errors.mapped(),
      data: matchedData(req),
    });
  }

  const formData = matchedData(req);
  const { username, text } = formData as { username: string; text: string };

  try {
    await query("INSERT INTO messages (username, text) VALUES ($1, $2)", [
      username,
      text,
    ]);

    res.redirect("/");
  } catch (error) {
    next(error);
  }
}
