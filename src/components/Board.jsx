import Users from "./Users";
import GamePlay from "./GamePlay";
import cards from "../data/cards.json";
import { useState, useEffect } from "react";
import { userNames } from "../data/userNames";
import { shuffleCards } from "../utils/utils";
import "./Board.css";

export default function Board() {
  const [blackCard, setBlackCard] = useState({});
  const [users, setUsers] = useState([]);
  const [roundCount, setRoundCount] = useState(0);

  const selectRandomBlackCard = () => {
    const randomIndex = Math.floor(Math.random() * cards.black.length);
    return cards.black[randomIndex];
  };

  const selectWhiteCardsForPlayers = () => {
    const setOfCards = [];
    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * cards.white.length);
      setOfCards.push(cards.white[randomIndex]);
    }
    return setOfCards;
  };

  const createUserArray = () => {
    return userNames.map((name, index) => ({
      id: index,
      name: name,
      whiteCards: selectWhiteCardsForPlayers(),
      score: 0,
    }));
  };

  useEffect(() => {
    setBlackCard(selectRandomBlackCard());
    setUsers(createUserArray());
  }, []);

  const getWinner = (arr) => {
    if (arr.length === 0) {
      return null;
    }

    return arr.reduce((maxObj, currentObj) => {
      return currentObj.score > maxObj.score ? currentObj : maxObj;
    });
  };

  const theWinner = getWinner(users);

  const updateScore = (data) => {
    const updatedUsers = users.map((user) => {
      if (user.name === data) {
        return {
          ...user,
          score: user.score + 1,
        };
      } else {
        return user;
      }
    });
    setUsers(updatedUsers);
    setBlackCard(selectRandomBlackCard());
    setRoundCount(roundCount + 1);

    if (roundCount + 1 >= 20) {
      alert(`Game is over! The winner is ${theWinner.name}`);
    }
  };

  const whiteCardsForRound = users.map((user) => {
    const shuffledWhiteCards = shuffleCards([...user.whiteCards]);
    const pickedWhiteCards = shuffledWhiteCards.slice(0, blackCard.pick);
    return {
      user: user.name,
      whiteCards: pickedWhiteCards,
    };
  });

  return (
    <div className="board">
      <div className="content">
        <div className="users">
          <Users data={users} />
        </div>
        <div className="gameplay">
          <GamePlay
            cardsForRound={whiteCardsForRound}
            selectedBlackCard={blackCard}
            updateScore={updateScore}
            round={roundCount}
            winner={theWinner}
          />
        </div>
      </div>
    </div>
  );
}
