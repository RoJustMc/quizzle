import express from "express";
import cors from "cors";

const app=express();
app.use(cors());
app.use(express.json());

let rooms = {};
const ADMIN_PASSWORD = "admin123";

app.post("/createRoom", (req, res) => {
    const { password } = req.body;

    if (password !== ADMIN_PASSWORD) {
        return res.status(403).json({ error: "Du bist nicht berechtigt, einen Room zu erstellen!" });
    }

    const roomCode = Math.random().toString(36).substr(2, 6).toUpperCase();
    rooms[roomCode] = [];

    res.json({ roomCode, message: "Room erfolgreich erstellt!" });
});

app.post("/joinRoom", (req, res) => {
    const { roomCode, name } = req.body;

    if (!roomCode || !name) {
        return res.status(400).json({ error: "Room-Code und Name erforderlich!" });
    }

    if (!rooms[roomCode]) {
        return res.status(404).json({ error: "Room nicht gefunden!" });
    }

    const newPlayer = { name, score: Math.floor(Math.random() * 100) };
    rooms[roomCode].push(newPlayer);

    res.json({ message: `Spieler ${name} beigetreten`, players: rooms[roomCode] });
});

app.get("/getPlayers/:roomCode", (req, res) => {
    const { roomCode } = req.params;
    if (!rooms[roomCode]) {
        return res.status(404).json({ error: "Room nicht gefunden!" });
    }
    res.json(rooms[roomCode]);
});

app.delete("/removePlayer/:roomCode/:name", (req, res) => {
    const { roomCode, name } = req.params;
    if (!rooms[roomCode]) {
        return res.status(404).json({ error: "Room nicht gefunden!" });
    }

    rooms[roomCode] = rooms[roomCode].filter(player => player.name !== name);
    res.json({ message: `Spieler ${name} entfernt`, players: rooms[roomCode] });
});

app.post("/leaveRoom", (req, res) => {
    const { roomCode, name } = req.body;

    if (!rooms[roomCode]) {
        return res.status(404).json({ error: "Room nicht gefunden!" });
    }

    setTimeout(() => {
        if (rooms[roomCode]) {
            rooms[roomCode] = rooms[roomCode].filter(player => player.name !== name);
        }
    }, 5000);

    res.json({ message: `Spieler ${name} wird entfernt, falls er nicht zurückkommt.` });
});

app.listen(5000, () => {
    console.log("App is running on port: 5000");
});