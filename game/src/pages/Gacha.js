import React from "react";
import ReactDOM from "react-dom/client";
import { useState } from "react";
import { Link } from "react-router-dom";

import "../index.css";
import useLocalStorage from "../hooks/useLocalStorage";
import useCards from "../hooks/useCards";

function Gacha() {
  const [cardImageURL, setCardImageURL] = useState();
  const [currency, setCurrency] = useLocalStorage("currency");
  const [localCardJson, setCards] = useLocalStorage("cards");
  const cards = JSON.parse(localCardJson) ?? {};
  const { data: cardData, isPending, error } = useCards();

  if (isPending) return <span>Loading...</span>;
  if (error) return <span>Error loading data</span>;

  function pullGacha() {
    const pullNum = Math.floor(Math.random() * 100);
    const rarity =
      pullNum === 0
        ? "epic"
        : pullNum < 5
        ? "rare"
        : pullNum < 20
        ? "uncommon"
        : "common";
    const eligibleCards = cardData.filter((card) => card["rarity"] === rarity);
    const card =
      eligibleCards[Math.floor(Math.random() * eligibleCards.length)];

    setCardImageURL(`/assets/cards/${card["rarity"]}/${card["name"]}.png`);
    // we don't have to use the cards setter because state will be updated by the currency setter
    if (card["id"] in cards) {
      cards[card["id"]]++;
      setCards(JSON.stringify(cards));
      setCurrency(currency - 1);
    } else {
      cards[card["id"]] = 1;
      setCards(JSON.stringify(cards));
      setCurrency(currency - 1);
    }
  }

  return (
    <div style={{width: "100%", height: "90vh", alignContent: "center", justifyContent: "center"}}>
      <p className="container">
        {cardImageURL ? (
          <img src={cardImageURL} className="playingCard" />
        ) : (
          <div style={{width: "100%", height: "67vh", alignContent: "center", justifyContent: "center"}}>
            <h1>No cards drawn yet.</h1>
            <h3>Click the button below to start!</h3>
          </div>
        )}
        <button
          onClick={pullGacha}
          className="App-button"
          disabled={currency <= 0 ? true : false}
        >
          1 Card Draw: $1
        </button>
      </p>
    </div>
  );
}

export default Gacha;
