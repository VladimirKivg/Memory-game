import React from "react";
import Square from "./Square";

const Board = ({ board, openCard, isBlocked }) => {
  return (
    <div className={isBlocked ? "board blocked" : "board"}>
      {board.map((card, i) => (
        <Square card={card} key={i} openCard={openCard} />
      ))}
    </div>
  );
};

export default Board;
