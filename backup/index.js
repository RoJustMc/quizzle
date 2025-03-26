import express from "express";
import cors from "cors";

const app=express();
app.use(cors());
app.use(express.json());

let players = [];
let rooms = {};

app.post("/createRoom", (req, res) => {
    const roomCode = Math.random().toString(36).substr(2, 6).toUpperCase();
    rooms[roomCode] = [];
    res.json({ roomCode, message: "Room erstellt!" });
});

app.post("/joinRoom", (req, res) => {
    const { roomCode, name } = req.body;
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

app.get("/getData", (req, res) => {
    res.send("Hello, welcome to the room!");
});

app.get("/getPlayers", (req, res) => {
    res.json(players);
});

app.post("/addPlayer", (req, res) => {
    console.log("Empfangene Daten:", req.body); // Prüfen, ob req.body Daten enthält

    const { name, score } = req.body;

    if (!name || score === undefined) {
        return res.status(400).json({ error: "Name und Score erforderlich" });
    }

    players.push({ name, score });
    res.json({ message: "Spieler hinzugefügt", players });
});

app.delete("/removePlayer/:name", (req, res) => {
    const { name } = req.params;
    const initialLength = players.length;

    players = players.filter(player => player.name !== name);

    if (players.length < initialLength) {
        res.json({ message: `Spieler ${name} entfernt`, players });
    } else {
        res.status(404).json({ error: "Spieler nicht gefunden" });
    }
});

app.listen(5000, () => {
    console.log("App is running.");
});