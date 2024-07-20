import { WebSocket } from "ws";
import { getUserSocket } from "..";
import { callback } from "./callback";
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
      // Notify the answerer with a success message
      callback({
        eventType: "answerCallback",
        ws,
        data: { success: true, targetId: data.targetId },
      });
    } else {
      callback({
        eventType: "answerCallback",
        ws,
        data: { success: false, message: "Target not found" },
      });
    }
  } catch (error) {
    console.error("Error handling answer event:", error);
    callback({
      eventType: "answerCallback",
      ws,
      data: { success: false, message: error },
    });
  }
};
