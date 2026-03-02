import './config/env.js';
import http from 'http';
import { Server } from 'socket.io';
import app from './app.js';

const server = http.createServer(app);
const allowedOrigins = [
    "http://localhost:5173",
    "https://fleet-flow-amber.vercel.app"
];

const io = new Server(server, {
    cors: {
        origin: allowedOrigins,
        methods: ["GET", "POST"],
        credentials: true
    }
});

// Socket initialization
import { initFleetSockets } from './sockets/fleet.socket.js';
initFleetSockets(io);

const PORT = process.env.PORT || 5001;

server.listen(PORT, () => {
    console.log(`\n==================================================`);
    console.log(`🚀 FleetFlow System is LIVE!`);
    console.log(`📡 Port: ${PORT}`);
    console.log(`💻 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`==================================================\n`);
});
