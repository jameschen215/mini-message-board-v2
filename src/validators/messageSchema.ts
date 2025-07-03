import { checkSchema } from "express-validator";

export const messageSchema = checkSchema({
  username: {
    in: ["body"],
    isString: true,
    isLength: {
      options: { min: 2, max: 10 },
      errorMessage: "Username must be between 2 and 10 characters",
    },
    notEmpty: {
      errorMessage: "Username is required",
    },
  },
  text: {
    in: ["body"],
    isString: true,
    trim: true,
    isLength: {
      options: { min: 1 },
      errorMessage: "Message text must not be empty",
    },
  },
});
