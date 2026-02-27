import openSocket from "socket.io-client";
import { getBackendUrl } from "../config";

function connectToSocket() {
  let token = localStorage.getItem("token");
  try {
    token = token ? JSON.parse(token) : null;
  } catch {
    token = null;
  }
  if (!token) {
    // No conectar si no hay token válido
    return null;
  }
  return openSocket(getBackendUrl(), {
    transports: ["websocket", "polling", "flashsocket"],
    query: {
      token,
    },
  });
}

export default connectToSocket;
