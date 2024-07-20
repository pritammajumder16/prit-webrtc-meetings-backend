import { roomMap, userSocketMap } from "../../controllers/socketController";
import { WebSocket } from "ws";
export const socketOnClose = (ws: WebSocket) => {
  try {
    const userId = (ws as any).userId;
    const roomId = (ws as any).roomId;
    userSocketMap.delete(userId!);
    console.log(`User ${userId} disconnected`);

    // Remove user from the room and notify others
    if (roomId && roomMap.has(roomId)) {
      const sockets = roomMap.get(roomId)!;
      sockets.delete(ws);

      // Notify other users in the room about the disconnection
      sockets.forEach((socket) => {
        socket.send(
          JSON.stringify({
            type: "user_left",
            userId: userId,
            roomId: roomId,
          })
        );
      });

      // Clean up the room if empty
      if (sockets.size === 0) {
        roomMap.delete(roomId);
      }
    }
  } catch (error) {
    console.log("Error handling WebSocket close event:", error);
  }
};
