import { WebSocket } from "ws";
import { handleAnswer, handleCall, handleJoinRoom } from "..";
import { callback } from "./callback";
export const socketEvents = (ws: WebSocket, data: any) => {
  try {
    switch (data.eventType) {
      case "join_room":
        handleJoinRoom(ws, data);
        break;
      case "call":
        handleCall(ws, data);
        break;
      case "answer_call":
        handleAnswer(ws, data);
        break;
      default:
        callback({ eventType: "unknownType", data: { success: false }, ws });
        console.error("Unknown message type:", data.type);
    }
  } catch (error) {
    console.log(error);
  }
};
