import { useState, useEffect } from "react";
import request from 'superagent';


const App = () => {
  const [scores, setScores] = useState([]);
  const [players, setPlayers] = useState([]);
  const [games, setGames] = useState([]);
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [table, setTable] = useState("");

  const [player, setPlayer] = useState("");
  const [game, setGame] = useState("");
  const [date, setDate] = useState("");
  const [score, setScore] = useState("");
  const [place, setPlace] = useState("");

  const apiURL = 'http://localhost:3000';

  const handlePlayerInputChange = (e) => {
    setName(e.target.value);
  };

  const handleRemoveIdChange = (e) => {
    setId(e.target.value);
  };

  const handleRemoveTableChange = (e) => {
    setTable(e.target.value);
  };

  const handlePlayerSubmit = (e) => {
    e.preventDefault();
    // Use 'inputValue' for the form input value here
    console.log(name);
    AddPlayer(name)
  };

  const handleScoreSubmit = (e) => {
    e.preventDefault();
    // Use 'inputValue' for the form input value here
    console.log(name);
    AddScore(player, game, date, score, place)
  };

  const handleGameSubmit = (e) => {
    e.preventDefault();
    // Use 'inputValue' for the form input value here
    console.log(name);
    AddGame(name)
  };

  const handleRemoveSubmit = (e) => {
    e.preventDefault();
    // Use 'inputValue' for the form input value here
    console.log(table, id);
    Remove(table, id)
  };


  function AddPlayer(data) {
    const sendData = {
      name: data
    }
    console.log(sendData)
    request
      .post(`${apiURL}/insertplayer`)
      .send(sendData) // Send an object with the 'name' property
      .set('Content-Type', 'application/json') // Set the content type (optional, depending on your API)
      .end((err, response) => {
        if (err) {
          console.error('Error:', err);
        } else {
          console.log('Response:', response.body);
          // You can handle the response data as needed (e.g., update your UI)
        }
      });
  }

  function AddScore(platerData, gameData, dateData, scoreData, placeData) {
    const sendData = {
      player: platerData,
      game: gameData,
      date: dateData,
      score: scoreData,
      place: placeData
    }
    console.log(sendData)
    request
      .post(`${apiURL}/insertscore`)
      .send(sendData) // Send an object with the 'name' property
      .set('Content-Type', 'application/json') // Set the content type (optional, depending on your API)
      .end((err, response) => {
        if (err) {
          console.error('Error:', err);
        } else {
          console.log('Response:', response.body);
          // You can handle the response data as needed (e.g., update your UI)
        }
      });
  }

  function AddGame(data) {
    const sendData = {
      name: data
    }
    console.log(sendData)
    request
      .post(`${apiURL}/insertplayer`)
      .send(sendData) // Send an object with the 'name' property
      .set('Content-Type', 'application/json') // Set the content type (optional, depending on your API)
      .end((err, response) => {
        if (err) {
          console.error('Error:', err);
        } else {
          console.log('Response:', response.body);
          // You can handle the response data as needed (e.g., update your UI)
        }
      });
  }

  function Remove(tableData, idData) {
    const sendData = {
      table: tableData,
      id: idData
    }
    console.log(sendData)
    request
      .post(`${apiURL}/remove`)
      .send(sendData) // Send an object with the 'name' property
      .set('Content-Type', 'application/json') // Set the content type (optional, depending on your API)
      .end((err, response) => {
        if (err) {
          console.error('Error:', err);
        } else {
          console.log('Response:', response.body);
          // You can handle the response data as needed (e.g., update your UI)
        }
      });
  }


  useEffect(() => {
    // Make a GET request to your API to fetch scores data
    fetch("http://localhost:3000/scores")
      .then((response) => response.json())
      .then((data) => setScores(data))
      .catch((error) => console.error(error));

    fetch("http://localhost:3000/players")
      .then((response) => response.json())
      .then((data) => setPlayers(data))
      .catch((error) => console.error(error));

    fetch("http://localhost:3000/games")
      .then((response) => response.json())
      .then((data) => setGames(data))
      .catch((error) => console.error(error));
  }, []);


  return (
    <div>
      <h2>Scores List</h2>
      <ul>
        {scores.map((score) => (
          <li key={score.id}>
            Id: {score.player_id}, Game: {score.game_id}, Score: {score.score}, Date: {score.date}
          </li>
        ))}
      </ul>
      <h2>Games List</h2>
      <ul>
        {games.map((game) => (
          <li key={game.id}>
            Id: {game.id}, Name: {game.name}
          </li>
        ))}
      </ul>
      <h2>Player List</h2>
      <ul>
        {players.map((player) => (
          <li key={player.id}>
            Id: {player.id}, Name: {player.name}
          </li>
        ))}
      </ul>
      <h2>Add New Player</h2>
      <form onSubmit={handlePlayerSubmit}>
        <input
          type="text"
          placeholder="Enter player name"
          value={name}
          onChange={handlePlayerInputChange}
        />
        <button type="submit">Add Player</button>
      </form>
      <h2>Remove</h2>
      <form onSubmit={handleRemoveSubmit}>
        <h3>Table</h3>
        <label>
          <input
            type="radio"
            name="options"
            value="players"
            onChange={handleRemoveTableChange}
            checked={table === 'players'}
          />
          players
        </label>
        <br />
        <label>
          <input
            type="radio"
            name="options"
            value="games"
            onChange={handleRemoveTableChange}
            checked={table === 'games'}
          />
          games
        </label>
        <br />
        <label>
          <input
            type="radio"
            name="options"
            value="scores"
            onChange={handleRemoveTableChange}
            checked={table === 'scores'}
          />
          scores
        </label>
        <br />
        <h3>ID</h3>
        <input
          type="number"
          placeholder="Enter ID"
          value={id}
          onChange={handleRemoveIdChange}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default App;