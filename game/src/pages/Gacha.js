import React from "react";
import ReactDOM from "react-dom/client";
import { useState } from "react";
import { Link } from "react-router-dom";

import "../index.css";
import useLocalStorage from "../hooks/useLocalStorage";
import useCards from "../hooks/useCards";

function Gacha() {
  const [pulledCard, setPulledCard] = useState(0);
  const [cardImageURL, setCardImageURL] = useState();
  const [currency, setCurrency] = useLocalStorage("currency");
  const [localCardJson] = useLocalStorage("cards");
  const cards = JSON.parse(localCardJson) ?? {};
  const { data, isPending, error } = useCards();

  if (isPending) return <span>Loading...</span>;
  if (error) return <span>Error loading data</span>;
  const cardData = data["cards"];

  function pullGacha() {
    setPulledCard(Math.floor(Math.random() * 12));
    console.log(pulledCard);
    let card = cardData[pulledCard];
    setCardImageURL(`/assets/cards/${card["rarity"]}/${card["name"]}.png`);
    // we don't have to use the cards setter because state will be updated by the currency setter
    if (pulledCard in cards) {
      cards[pulledCard]++;
      localStorage.setItem("cards", JSON.stringify(cards));
      setCurrency(currency - 1);
    } else {
      cards[pulledCard] = 1;
      localStorage.setItem("cards", JSON.stringify(cards));
      setCurrency(currency - 1);
    }
  }

  return (
    <div>
      <p>
        <Link to="/">Home</Link>
      </p>
      <p>
        {cardImageURL ? (
          <img src={cardImageURL} className="playingCard" />
        ) : (
          <div>no card pulled</div>
        )}
        <button onClick={pullGacha} disabled={currency <= 0 ? true : false}>
          Pull!
        </button>
      </p>
    </div>
  );
}

export default Gacha;
