import { useState, useEffect } from "react";
import { shuffleCards } from "../utils/utils";

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
  };

  useEffect(() => {
    setBlackCard(selectedBlackCard);
  }, [selectedBlackCard]);

  return (
    <div>
      <button onClick={() => chooseBlackCard()}>Choose a black card</button>
      {playBlackCard ? (
        <div>
          <div>
            <h2>Black Card: {blackCard.text}</h2>
          </div>
          <button onClick={() => setPlayWhiteCards(true)}>Reveal cards</button>
        </div>
      ) : (
        <></>
      )}

      {playWhiteCards ? (
        <div>
          <h3>Answers:</h3>
          <div>
            {shuffleCards([...cardsForRound]).map((user, index) => (
              <div key={index}>
                <ul onClick={() => completeGameRound(user)}>
                  {user.whiteCards.map((card, i) => (
                    <li key={i}>{card}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
