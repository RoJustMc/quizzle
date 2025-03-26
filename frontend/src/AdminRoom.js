import React, { useEffect, useState, useCallback } from "react";
import { useParams } from 'react-router-dom';
import Axios from "axios";
import logo from './img/adminLogo.png';

const Room = () => {
    const { roomCode } = useParams();
    const [players, setPlayers] = useState([]);

    const fetchPlayers = useCallback(async () => {
        if (!roomCode) return;

        try {
            const response = await Axios.get(`http://192.168.0.102:5000/getPlayers/${roomCode}`);
            setPlayers(response.data);
        } catch (error) {
            console.error("Fehler beim Abrufen der Spieler:", error);
        }
    }, [roomCode]);
      
    const kickPlayer = async (name) => {
        await Axios.delete(`http://192.168.0.102:5000/removePlayer/${roomCode}/${name}`);
        fetchPlayers();
    };
      
    const startGame = async () => {
    };
      
    const nextQuestion = async () => {
    };

    useEffect(() => {
        const interval = setInterval(fetchPlayers, 2000);
        return () => clearInterval(interval);
    }, [fetchPlayers]);

    return (
        <>
            <div className="container2">
                <img src={logo} className="logo" alt="" />
                <div className="infos-container">
                    <h1>Raumverwaltung</h1>
                    <h2>Raum-Code: {roomCode}</h2>
                    <div className="button-box2">
                        <button id="start-btn" onClick={startGame}>Spiel starten</button>
                        <button id="next-btn" onClick={nextQuestion}>Nächste Frage</button>
                    </div>
                </div>
                <div className="players-container">
                    <h1>Aktuelle Spieler ({players.length})</h1>
                    <div className="players-list">
                        {players.map((player, index) => (
                            <button className="player-box" key={index} onClick={() => kickPlayer(player.name)}>
                                {player.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Room;