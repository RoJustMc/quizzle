import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import Axios from "axios";
import logo from './img/logo.png';

const Room = () => {
    const { roomCode } = useParams();
    const navigate = useNavigate();
    const [players, setPlayers] = useState([]);
    const [playerName] = useState(localStorage.getItem("playerName"));

    const fetchPlayers = useCallback(async () => {
        if (!roomCode) return;

        try {
            const response = await Axios.get(`http://192.168.0.102:5000/getPlayers/${roomCode}`);
            setPlayers(response.data);

            // Prüfen, ob der Spieler noch in der Liste ist
            const isStillInRoom = response.data.some(player => player.name === playerName);
            if (!isStillInRoom) {
                alert("Du wurdest aus dem Raum entfernt!");
                navigate("/");
            }
        } catch (error) {
            console.error("Fehler beim Abrufen der Spieler:", error);
        }
    }, [roomCode, navigate, playerName]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const handleUnload = async () => {
                if (roomCode && playerName) {
                    await Axios.post("http://192.168.0.102:5000/leaveRoom", { roomCode, name: playerName });
                }
            };
    
            window.addEventListener("beforeunload", handleUnload);
    
            return () => {
                window.removeEventListener("beforeunload", handleUnload);
            };
        }
    }, [roomCode, playerName]);

    useEffect(() => {
        const interval = setInterval(fetchPlayers, 2000);
        return () => clearInterval(interval);
    }, [fetchPlayers]);

    return (
        <>
            <div className="container2">
                <img src={logo} className="logo" alt="" />
                <div className="infos-container">
                    <h1>Warten auf Spieler...</h1>
                    <h2>Raum-Code: {roomCode}</h2>
                </div>
                <div className="players-container">
                    <h1>Aktuelle Spieler ({players.length})</h1>
                    <div className="players-list">
                        {players.map((player, index) => (
                            <div className="player-box" key={index}>
                                {player.name}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Room;