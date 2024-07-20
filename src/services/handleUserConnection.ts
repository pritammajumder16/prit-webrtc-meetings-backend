import http from "http";
import { WebSocket } from "ws";
import { userSocketMap } from "../controllers/webSocketController";
import { socketEvents } from "./socketEvents";
import { socketOnClose } from "./socketOnClose";
export const handleUserConnection = (
  request: http.IncomingMessage,
  ws: WebSocket
) => {
  try {
    const url = new URL(request.url!, `http://${request.headers.host}`);
    const userId = url.searchParams.get("userId");

    if (userId) {
      // Attach userId to the WebSocket instance
      (ws as any).userId = userId;

      // Add user to the userSocketMap
      userSocketMap.set(userId, ws);

      // Notify the user that they are connected
      ws.send(
        JSON.stringify({
          type: "connected",
          userId: userId,
        })
      );

      console.log(`User ${userId} `);
      ws.on("message", (message: any) => {
        const data = JSON.parse(message.toString());
        socketEvents(ws, data);
      });
      ws.on("close", () => {
        socketOnClose(ws);
      });
      ws.on("error", (error) => {
        console.error("WebSocket error:", error);
      });
    } else {
      ws.close();
    }
  } catch (error) {
    console.log(error);
  }
};
