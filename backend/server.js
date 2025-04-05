import http from "http";
import app from "./app.js";
import "dotenv/config.js";

const server = http.createServer(app);

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
