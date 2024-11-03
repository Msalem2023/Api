import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { Server } from "socket.io";
import cors from "cors";
import bootstrap from "./src/index.router.js";
import userModel from "./DB/model/user.model.js";
import { verifyToken } from "./src/utilies/GenerateAndVerifyToken.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static('./uploads'));

// Bootstrap your routes and middleware
bootstrap(app, express);

// Export the app as a serverless function
export default (req, res) => {
    // Create a new HTTP server for socket.io
    const httpServer = require('http').createServer(app);
    const io = new Server(httpServer, { cors: "*" });

    io.on('connection', (socket) => {
        socket.on("updateSockets", async (data) => {
            try {
                const token = data?.token;
                const { id } = verifyToken({ token });
                await userModel.findOneAndUpdate(
                    { _id: id },
                    { socketId: socket.id },
                    { new: true }
                );
            } catch (error) {
                console.error("Error verifying token or updating socket ID:", error);
                return;
            }

            socket.on('callUser', (data) => {
                io.to(data.userToCall).emit("callUser", {
                    signal: data.signalData,
                    from: data.from,
                    name: data.name,
                });
            });

            socket.on('answerCall', (data) => {
                io.to(data.to).emit("callAccepted", data.signal);
            });

            socket.on('disconnect', () => {
                socket.broadcast.emit("callEnded");
            });
        });
    });

    // Handle requests for the express app
    httpServer(req, res);
};

