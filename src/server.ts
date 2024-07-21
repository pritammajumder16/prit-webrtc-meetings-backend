import express from "express";
import http from "http";
import { credentials } from "./constants/credentials";
import corsConfig from "./config/corsConfig";
import router from "./routes";
import { wss } from "./controllers/socketController";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(corsConfig);
app.use(router);
const PORT = credentials.PORT || 8080;

server.on("upgrade", (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit("connection", ws, request);
  });
});

server.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
