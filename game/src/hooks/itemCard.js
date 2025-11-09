import useLocalStorage from "./useLocalStorage";

function ItemCard({ card, isSelected, onCardClick, className }) {
  const [ownedCardsString, setCards] = useLocalStorage("cards");
  const ownedCards = JSON.parse(ownedCardsString);

  // const imageUrl = cards[id] >= 1 ? cardmap[id] : cardmap[12];
  const playerOwnsCard = ownedCards && card["id"] in ownedCards;
  const imageUrl = playerOwnsCard
    ? `/assets/cards/${card["rarity"]}/${card["name"]}.png`
    : `/assets/cards/${card["rarity"]}/${card["name"]}.png`;
  const cardStyle = playerOwnsCard ? {
    outline: isSelected ? "5px solid green" : "none",
    borderRadius: "4px"
  } : {
    outline: isSelected ? "5px solid green" : "none",
    filter: "grayscale(100%) brightness(75%)"
  };
  return (
    <img
      src={imageUrl}
      className={className}
      style={cardStyle}
      alt={`Card ${card["id"]}`}
      onClick={onCardClick}
    />
  );
}

export default ItemCard;
