import { WebSocket } from "ws";
import { handleJoinRoom } from "./handleJoinRoom";
export function socketEvents(ws: WebSocket, data: any) {
  try {
    switch (data.type) {
      case "join_room":
        handleJoinRoom(ws, data);
        break;
      default:
        console.error("Unknown message type:", data.type);
    }
  } catch (error) {
    console.log(error);
  }
}
