import { useState, useEffect } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import Board from "./components/Board";

function App() {
  const emoji = ["🐬", "🐍", "🏄", "⛵", "🌺", "🌴"];
  const [board, setBoard] = useState(
    Array(12)
      .fill({})
      .map((el) => ({ id: uuidv4(), image: null, isOpen: false }))
  );
  const [history, setHistory] = useState([]);
  const [isBlocked, setIsBlocked] = useState(false);
  const [memoryGameResult, setMemoryGameResult] = useState([]);

  const fillBoard = () => {
    const boardCopy = board.map((el) => {
      el.image = null;
      el.isOpen = false;
      return el;
    });
    for (let i = 0; i < 2; i++) {
      for (const pic of emoji) {
        let randomIndex;
        do {
          randomIndex = Math.floor(Math.random() * 12);
        } while (boardCopy[randomIndex].image);
        boardCopy[randomIndex].image = pic;
      }
    }
    setBoard(boardCopy);
  };

  const openCard = (id, image) => {
    setIsBlocked(true);
    setHistory([...history, image]);

    const copyBord = board.map((el) =>
      el.id === id ? { ...el, isOpen: true } : el
    );

    setBoard(copyBord);
  };

  const checkCard = () => {
    const copyBord = board.map((el) =>
      el.image === history[history.length - 1] ||
      el.image === history[history.length - 2]
        ? { ...el, isOpen: false }
        : el
    );
    setBoard(copyBord);
    setIsBlocked(false);
  };

  const finish = () => {
    const rest = board.filter((el) => !el.isOpen);
    if (!rest.length) {
      return (
          <div>

      <h2> {`Поздравляем вы выиграли за ${history.length / 2} ходов`}</h2>
            <button onClick={restart}>restart</button>
          </div>
    );
    }
  };

  const restart = () => {
    fillBoard();
    setMemoryGameResult([...memoryGameResult,history.length/2])
    setHistory([]);
    setIsBlocked(false);
  }

  useEffect(() => {
    fillBoard();
  }, []);

  useEffect(() => {
    if (history.length % 2 === 0) {
      if (history[history.length - 1] !== history[history.length - 2]) {
        setTimeout(() => {
          checkCard();
        }, 700);
      } else {
        setIsBlocked(false);
      }
    } else setIsBlocked(false);
  }, [history]);

  console.log(history);

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <Board board={board} openCard={openCard} isBlocked={isBlocked} />
      {memoryGameResult.length && <p>game results : {memoryGameResult.join(', ')}</p>}
      {finish()}
    </div>
  );
}

export default App;
