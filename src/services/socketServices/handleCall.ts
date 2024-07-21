import { WebSocket } from "ws";
import { getUserSocket } from "..";
import { callback } from "./callback";
export const handleCall = (ws: WebSocket, data: any) => {
  try {
    const targetSocket = getUserSocket(data.targetId);
    if (targetSocket) {
      targetSocket.send(
        JSON.stringify({
          eventType: "incoming_call",
          callerId: data.callerId,
          signalData: data.signalData,
          callerName: data.callerName,
        })
      );
      callback({
        eventType: "callCallback",
        ws,
        data: { success: true, targetId: data.targetId },
      });
    } else {
      callback({
        eventType: "callCallback",
        ws,
        data: { success: false, message: "User not found" },
      });
    }
  } catch (error) {
    console.error("Error handling call event:", error);
    callback({
      eventType: "callCallback",
      ws,
      data: { success: false, message: error },
    });
  }
};
