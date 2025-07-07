import { NextFunction, Request, Response } from "express";
import { matchedData, validationResult } from "express-validator";
import { formatDistanceToNow } from "date-fns";

import { query } from "@/db/pool.js";
import { MessageType } from "@/types/message.js";
import { CustomNotFoundError } from "@/errors/CustomNotFoundError.js";
import { getNoteStyle, getRandomColor } from "@/utils/getNoteStyle.js";

export async function getMessages(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { rows } = await query(
      "SELECT * FROM messages ORDER BY created DESC",
    );
    const messages = rows as MessageType[];

    const styledMessages = messages.map((msg) => ({
      ...msg,
      style: getNoteStyle(msg),
    }));
    res.render("index", { title: "Messages", messages: styledMessages });
  } catch (error) {
    next(error);
  }
}

export async function getMessageById(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { messageId } = req.params;

  try {
    const { rows } = await query("SELECT * FROM messages WHERE id = $1", [
      messageId,
    ]);
    console.log(rows[0]);
    if (!rows[0]) {
      throw new CustomNotFoundError("Message Not Found");
    }

    const row = rows[0] as MessageType;

    const message = {
      ...row,
      formattedDate: formatDistanceToNow(new Date(row.created), {
        addSuffix: true,
      }),
    } as MessageType;

    res.render("message", { title: "Message", message });
  } catch (error) {
    next(error);
  }
}

export function getCreateForm(_req: Request, res: Response) {
  res.render("create", {
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

  if (!errors.isEmpty()) {
    res.status(400).render("create", {
      errors: errors.mapped(),
      data: matchedData(req),
    });

    return;
  }

  const formData = matchedData(req);
  const { username, text } = formData as { username: string; text: string };

  try {
    await query(
      "INSERT INTO messages (username, text, color) VALUES ($1, $2, $3)",
      [username, text, getRandomColor()],
    );

    res.redirect("/");
  } catch (error) {
    next(error);
  }
}
