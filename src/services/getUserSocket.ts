import { userSocketMap } from "../controllers/webSocketController";
import { WebSocket } from "ws";
export function getUserSocket(userId: string): WebSocket | undefined {
  try {
    return userSocketMap.get(userId);
  } catch (error) {
    console.log("Error retrieving user socket:", error);
    return undefined;
  }
}
