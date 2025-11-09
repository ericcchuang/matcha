import useLocalStorage from "./useLocalStorage";

function ItemCard({ card, isSelected, onCardClick, className }) {
  const [ownedCardsString, setCards] = useLocalStorage("cards");
  const ownedCards = JSON.parse(ownedCardsString);

  // const imageUrl = cards[id] >= 1 ? cardmap[id] : cardmap[12];
  const playerOwnsCard = ownedCards && card["id"] in ownedCards;
  const imageUrl = `/assets/cards/${card["rarity"]}/${card["name"]}.png`;
  var cardStyle = {};

  if (!(className.endsWith("noTransition"))) {
    if (!playerOwnsCard) { return; }
    else {
      cardStyle = {
        outline: isSelected ? "5px solid green" : "none",
        borderRadius: "4px" }
    }
  } else if (!playerOwnsCard) {
    cardStyle = { filter: "grayscale(100%) brightness(75%)" };
  }

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
