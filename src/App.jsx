import Board from "./components/Board";
import { useState } from "react";
import "./App.css";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import backgroundPic from "../src/assets/backgroundPic.jpg";

function App() {
  const [game, setGame] = useState(false);

  if (!game)
    return (
      <div
        className="center-container"
        style={{ backgroundImage: `url(${backgroundPic})` }}
      >
        <Button variant="danger" size="lg" onClick={() => setGame(true)}>
          Start Game
        </Button>
      </div>
    );
  return <Board />;
}

export default App;
