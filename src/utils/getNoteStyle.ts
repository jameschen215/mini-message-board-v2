import { NOTE_COLORS } from "../constants/constants.js";
import { MessageType } from "../types/message.js";

export function getNoteStyle(message: MessageType) {
  return {
    offsetX: (Math.random() - 0.5) * 30, // -15px to 15px
    offsetY: (Math.random() - 0.5) * 30, // -15px to 15px
    rotation: (Math.random() - 0.5) * 10, // -5 to 5 degrees
    color: `bg-${message.color}-200`,
  };
}

export function getRandomColor() {
  return NOTE_COLORS[Math.floor(Math.random() * NOTE_COLORS.length)];
}
