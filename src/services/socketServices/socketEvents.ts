import { WebSocket } from "ws";
import { handleAnswer, handleCall, handleJoinRoom } from "..";
export const socketEvents = (ws: WebSocket, data: any) => {
  try {
    switch (data.type) {
      case "join_room":
        handleJoinRoom(ws, data);
        break;
      case "call":
        handleCall(ws, data);
        break;
      case "answer":
        handleAnswer(ws, data);
        break;
      default:
        console.error("Unknown message type:", data.type);
    }
  } catch (error) {
    console.log(error);
  }
};
