import { WebSocket } from "ws";
import { getUserSocket } from ".";
export const handleAnswer = (ws: WebSocket, data: any) => {
  try {
    const callerSocket = getUserSocket(data.callerId);
    if (callerSocket) {
      callerSocket.send(
        JSON.stringify({
          type: "call_answer",
          signalData: data.signalData,
        })
      );
    }
  } catch (error) {
    console.error("Error handling answer event:", error);
  }
};
