import { WebSocketServer, WebSocket } from "ws";
import http from "http";
import { handleUserConnection } from "../services";

const wss = new WebSocketServer({ noServer: true });
export const userSocketMap = new Map<string, WebSocket>(); // Maps userId to WebSocket
export const roomMap = new Map<string, Set<WebSocket>>(); // Maps roomId to a set of WebSockets
wss.on("connection", (ws: WebSocket, request: http.IncomingMessage) => {
  handleUserConnection(request, ws);
});

export { wss };
