import { roomMap } from "../../controllers/socketController";
import { WebSocket } from "ws";
import { callback } from "./callback";
export const handleJoinRoom = (ws: WebSocket, data: any) => {
  try {
    const { roomId } = data;
    const userId = (ws as any).userId;

    if (!roomId) {
      console.log("No room ID provided for join_room event");
      return;
    }

    // Retrieve the old room if applicable
    const oldRoomId = (ws as any).roomId;
    if (oldRoomId && roomMap.has(oldRoomId)) {
      const oldRoomSockets = roomMap.get(oldRoomId)!;
      oldRoomSockets.delete(ws);

      // Notify other users in the old room about the user leaving
      oldRoomSockets.forEach((socket) => {
        socket.send(
          JSON.stringify({
            eventType: "user_left",
            userId: userId,
            roomId: oldRoomId,
          })
        );
      });

      // Clean up the old room if empty
      if (oldRoomSockets.size === 0) {
        roomMap.delete(oldRoomId);
      }
    }

    // Add user to the new room
    if (!roomMap.has(roomId)) {
      roomMap.set(roomId, new Set<WebSocket>());
    }
    roomMap.get(roomId)!.add(ws);
    (ws as any).roomId = roomId;

    // Notify the user that they have joined the room
    ws.send(
      JSON.stringify({
        eventType: "room_joined",
        roomId: roomId,
      })
    );

    // Notify other users in the room about the new member
    roomMap.get(roomId)!.forEach((socket) => {
      if (socket !== ws) {
        socket.send(
          JSON.stringify({
            eventType: "user_joined",
            userId: userId,
            roomId: roomId,
          })
        );
      }
    });
    callback({
      eventType: "joinRoomCallback",
      data: { success: true, roomId },
      ws,
    });
    console.log(`User ${userId} joined room ${roomId}`);
  } catch (error) {
    console.error("Error handling join_room event:", error);
    callback({
      eventType: "joinRoomCallback",
      data: { success: true, message: error },
      ws,
    });
  }
};
