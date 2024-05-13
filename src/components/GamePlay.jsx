import { useState, useEffect } from "react";
import { shuffleCards } from "../utils/utils";
import "../styles/GamePlay.css";
import Button from "react-bootstrap/Button";

export default function GamePlay({
  cardsForRound,
  selectedBlackCard,
  updateScore,
  round,
  winner,
}) {
  const [blackCard, setBlackCard] = useState({});
  const [playWhiteCards, setPlayWhiteCards] = useState(false);
  const [playBlackCard, setPlayBlackCard] = useState(false);

  const chooseBlackCard = () => {
    if (round >= 20) {
      alert(`Game is over! The winner is ${winner.name}`);
      return;
    }
    setBlackCard(selectedBlackCard);
    setPlayBlackCard(true);
  };

  const completeGameRound = (winner) => {
    updateScore(winner.user);
    setPlayWhiteCards(false);
    setPlayBlackCard(false);
    chooseBlackCard();
  };

  useEffect(() => {
    setBlackCard(selectedBlackCard);
  }, [selectedBlackCard]);

  return (
    <div className="gameplay-container">
      <div className="black-card-container">
        <Button variant="dark" onClick={() => chooseBlackCard()}>
          Choose a black card
        </Button>
        {playBlackCard ? (
          <div className="black-card-text">
            <h2>{blackCard.text}</h2>
          </div>
        ) : null}
      </div>
      <div className="white-cards-container">
        {playBlackCard ? (
          <Button variant="light" onClick={() => setPlayWhiteCards(true)}>
            Reveal cards
          </Button>
        ) : null}

        {playWhiteCards ? (
          <div className="white-cards-row">
            {shuffleCards([...cardsForRound]).map((user, index) => (
              <div
                key={index}
                className="user-cards"
                onClick={() => completeGameRound(user)}
              >
                {user.whiteCards.map((card, i) => (
                  <div className="white-card" key={i}>
                    {card}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
