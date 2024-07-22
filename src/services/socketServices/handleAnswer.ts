import { WebSocket } from "ws";
import { getUserSocket } from "..";
import { callback } from "./callback";

export const handleAnswer = (ws: WebSocket, data: any) => {
  try {
    const callerSocket = getUserSocket(data.callerId);
    console.log(data);
    if (callerSocket) {
      callerSocket.send(
        JSON.stringify({
          eventType: "call_answer",
          signalData: data.signalData,
          callerId: data.myUserId,
          callerName: data.myName,
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
