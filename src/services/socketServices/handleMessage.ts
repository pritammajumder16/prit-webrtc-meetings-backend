import { WebSocket } from "ws";
import { callback } from "./callback";
import { roomMap } from "../../controllers/socketController";

export const handleMessage = (ws: WebSocket, data: any) => {
  try {
    console.log(data);
    const room = roomMap.get(data.roomId);
    if (room) {
      // Notify the answerer with a success message
      room.forEach((ws) => {
        ws.send(
          JSON.stringify({
            eventType: "incoming_message",
            message: data.message,
            from: data.from,
            time: data.time,
          })
        );
      });
      callback({
        eventType: "sendMessageCallback",
        ws,
        data: { success: true },
      });
    } else {
      callback({
        eventType: "sendMessageCallback",
        ws,
        data: { success: false, message: "Room not found" },
      });
    }
  } catch (error) {
    console.error("Error handling answer event:", error);
    callback({
      eventType: "sendMessageCallback",
      ws,
      data: { success: false, message: error },
    });
  }
};
