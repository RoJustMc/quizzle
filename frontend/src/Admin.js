import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Axios from "axios";
import logo from './img/adminLogo.png';

const Admin = () => {
    const [roomCode, setRoomCode] = useState("");
    const navigate = useNavigate();

    const createRoom = async () => {
        try {
            const response = await Axios.post("http://192.168.0.102:5000/createRoom", { password: "admin123" });
            alert("Der Raum wurde erfolgreich erstellt.\nRaum-Code: "+response.data.roomCode);
            navigate(`/admin/room/${response.data.roomCode}`);
        } catch (error) {
            alert("Fehler: " + (error.response?.data?.error || error.message));
        }
    };

    const visitRoom = async () => {
        if (!roomCode) return alert("Room-Code eingeben!");

        try {
            navigate(`/admin/room/${roomCode}`);
        } catch (error) {
            console.error("Fehler beim Beitreten:", error.response?.data || error.message);
            alert("Fehler: " + (error.response?.data?.error || error.message));
        }
    };

    return (
        <>
            <div className="container3">
                <img src={logo} className="logo" alt="" />
                <div className="create-container">
                    <h1>Räume erstellen</h1>
                    <div className="button-box">
                        <button id="create-btn" onClick={createRoom}>Erstellen</button>
                    </div>
                </div>
                <div className="visit-container">
                    <h1>Räume besichtigen</h1>
                    <div className="input-box">
                        <div className="detail">Raum-Code:</div>
                        <input type="text" id="roomcode" value={roomCode} onChange={(e) => setRoomCode(e.target.value)} placeholder="ABC123"></input>
                    </div>
                    <div className="button-box">
                        <button id="visit-btn" onClick={visitRoom}>Einsehen</button>
                    </div>
                </div>
            </div>
            {/* <h1>Room-Erstellung</h1>
            <input
                type="text"
                placeholder="Admin Passwort"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
            />
            <button onClick={createRoom}>Room erstellen</button>

            {roomCode && <h2>Room-Code: {roomCode}</h2>}

            <h3>Spieler im Room:</h3>
            <ul>
                {players.map((player, index) => (
                    <li key={index}>
                        {player.name} - Score: {player.score}
                        <button onClick={() => kickPlayer(player.name)}>Kick</button>
                    </li>
                ))}
            </ul> */}
        </>
    );
};

export default Admin;