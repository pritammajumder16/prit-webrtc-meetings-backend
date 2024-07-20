import { WebSocket } from "ws";
export interface CallbackData {
  eventType: string;
  data: any;
  ws: WebSocket;
}
