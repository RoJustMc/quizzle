import React, { useEffect, useState } from "react";
import Axios from "axios";

const App = () => {
  const [message, setMessage] = useState("");
  const [players, setPlayers] = useState([]);

  const fetchMessage = async() => {
    const response = await Axios.get("http://localhost:5000/getData");
    setMessage(response.data);
  };

  const fetchPlayers = async() => {
    const response = await Axios.get("http://localhost:5000/getPlayers");
    setPlayers(response.data);
  };

  const addPlayer = async () => {
    const newPlayer = { name: document.getElementById("userName").value, score: Math.floor(Math.random() * 100) };
    
    try {
        await Axios.post("http://localhost:5000/addPlayer", newPlayer, {
            headers: { "Content-Type": "application/json" },
        });
        fetchPlayers(); // Liste aktualisieren
    } catch (error) {
        console.error("Fehler beim Hinzufügen:", error.response?.data || error.message);
    }
};

const removePlayer = async (name) => {
  try {
      await Axios.delete(`http://localhost:5000/removePlayer/${name}`);
      fetchPlayers(); // Aktualisiert die Liste nach dem Entfernen
  } catch (error) {
      console.error("Fehler beim Entfernen:", error.response?.data || error.message);
  }
};

  useEffect(() => {
    fetchMessage();
    fetchPlayers();
  }, []);

  document.title = "Quizzle";

  return (
    <>
      <h1>{message}</h1>
      <input type="text" id="userName" placeholder="Name here"></input>
      <button onClick={addPlayer}>Spieler hinzufügen</button>
      <ul>
  {players.map((player, index) => (
    <li key={index}>
      {player.name} - Score: {player.score} 
      <button onClick={() => removePlayer(player.name)}>Leave</button>
    </li>
  ))}
</ul>
    </>
  );
};

export default App;