import http from "http";
import app from "./app.js";
import "dotenv/config.js";
import { initializeSocket } from "./socket.js";

const server = http.createServer(app);

const PORT = process.env.PORT || 8000;

initializeSocket(server);

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
