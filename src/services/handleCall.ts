import { WebSocket } from "ws";
import { getUserSocket } from ".";
export const handleCall = (ws: WebSocket, data: any) => {
  try {
    const targetSocket = getUserSocket(data.targetId);
    if (targetSocket) {
      targetSocket.send(
        JSON.stringify({
          type: "incoming_call",
          callerId: data.callerId,
          signalData: data.signalData,
        })
      );
    }
  } catch (error) {
    console.error("Error handling call event:", error);
  }
};
