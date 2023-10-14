import { Server } from "socket.io";

// Export a default function for handling sockets
export default function SocketHandler(req, res) {
    // Check if the socket is already set up
    if (res.socket.server.io) {
        console.log("Socket already set up");
        res.end(); // End the response
        return;
    }

    // Create a new socket server using the provided server instance
    const io = new Server(res.socket.server);

    // Attach the socket server to the server instance
    res.socket.server.io = io;

    // Set up event handling for new connections
    io.on("connection", (socket) => {
        // Listen for a "send-message" event from the client
        socket.on("send-message", (obj) => {
            // Emit a "receive-message" event to all connected clients
            io.emit("receive-message", obj);
        });
    });

    // Log that the socket is being set up
    console.log("Setting up socket");

    // End the response
    res.end();
}
