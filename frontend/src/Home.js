import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; // Zum Navigieren
import Axios from "axios";
import logo from './img/logo.png';

const Home = () => {
  const [roomCode, setRoomCode] = useState("");
  const [playerName, setPlayerName] = useState("");
  const navigate = useNavigate();

    const joinRoom = async () => {
        if (!roomCode || !playerName) return alert("Room-Code und Name eingeben!");

        try {
            await Axios.post("http://192.168.0.102:5000/joinRoom", { roomCode, name: playerName }, {
                headers: { "Content-Type": "application/json" }
            });
            localStorage.setItem("playerName", playerName);
            navigate(`/room/${roomCode}`);
        } catch (error) {
            console.error("Fehler beim Beitreten:", error.response?.data || error.message);
            alert("Fehler: " + (error.response?.data?.error || error.message));
        }
    };

    return (
        <>
            <div className="container">
                <img src={logo} className="logo" alt="" />
                <div className="roomcode-container">
                    <h1>Raum-Code eingeben</h1>
                    <div className="input-list">
                        <div className="input-box">
                            <div className="detail">Raum-Code:</div>
                            <input type="text" id="roomcode" value={roomCode} onChange={(e) => setRoomCode(e.target.value)} placeholder="ABC123"></input>
                        </div>
                        <div className="input-box">
                            <div className="detail">Anzeigename:</div>
                            <input type="text" id="displayname" value={playerName} onChange={(e) => setPlayerName(e.target.value)} placeholder="Vector"></input>
                        </div>
                    </div>
                    <div className="button-box">
                        <button id="join-btn" onClick={joinRoom}>Beitreten</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;