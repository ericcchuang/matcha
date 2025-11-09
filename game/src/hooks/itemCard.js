import useLocalStorage from "./useLocalStorage";

function ItemCard({ card, isSelected, onCardClick, className }) {
  const [ownedCardsString, setCards] = useLocalStorage("cards");
  const ownedCards = JSON.parse(ownedCardsString);

  // const imageUrl = cards[id] >= 1 ? cardmap[id] : cardmap[12];
  const playerOwnsCard = ownedCards && card["id"] in ownedCards;
  const imageUrl = playerOwnsCard
    ? `/assets/cards/${card["rarity"]}/${card["name"]}.png`
    : "/assets/icons/math.png";
  const cardStyle = {
    "border": isSelected ? "5px solid green" : "5px solid #ccc"
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