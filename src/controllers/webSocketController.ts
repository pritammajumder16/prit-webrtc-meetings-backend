import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ noServer: true });

wss.on("connection", (ws: WebSocket) => {
  console.log("New client connected");

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

export { wss };
