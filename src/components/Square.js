import React from "react";

const Square = ({ card, openCard }) => {
  // console.log(card.image);
  return (
    <button className={`square ${card.isOpen && "blocked"}`}  onClick={() => openCard(card.id, card.image)}>
      {card.isOpen && card.image}
    </button>
  );
};

export default Square;
