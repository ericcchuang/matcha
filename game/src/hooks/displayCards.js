import useLocalStorage from "./useLocalStorage";
{/* function displayCards () {
    const [ownedCardsString, setCards] = useLocalStorage("cards");
    const ownedCards = JSON.parse(ownedCardsString);
    const [selectedIds, setSelectedIds] = useState([]);
}

const handleCardClick = (id) => {
    if (!ownedCards || !ownedCards[id] || ownedCards[id] <= 0) {
      return;
    }
    if (selectedIds.length >= 5 && !selectedIds.includes(id)) {
      return;
    }
    setSelectedIds((prevIds) => {
      if (prevIds.includes(id)) {
        return prevIds.filter((currentId) => currentId !== id);
      }
      return [...prevIds, id];
    });
  };

{Object.entries(cardData).map(([key]) => {
              if (selectedIds.includes(key)) {
                return (
                  <ItemCard
                    card={cardData[key]}
                    key={key}
                    id={key}
                    alt={`Selected Card ${key}`}
                    className="gameplayCard2"
                  />
                );
              }
              return null;
            })}

{Object.entries(cardData).map(([key]) => {
                // Check if this card's ID is in the state array
                const isSelected = selectedIds.includes(key);

                // Render the ItemCard, passing the props it needs
                return (
                  <ItemCard
                    key={key}
                    card={cardData[key]}
                    isSelected={isSelected}
                    onCardClick={() => handleCardClick(key)}
                    className="gameplayCard"
                  />
                );
              })}

function ItemCard({ card, isSelected, onCardClick, className }) {
  // const imageUrl = cards[id] >= 1 ? cardmap[id] : cardmap[12];
  const playerOwnsCard = ownedCards && card["id"] in ownedCards;
  const imageUrl = playerOwnsCard
    ? `/assets/cards/${card["rarity"]}/${card["name"]}.png`
    : "/assets/icons/math.png";
  const cardStyle = {
    border: isSelected ? "5px solid green" : "5px solid #ccc",
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

export default ItemCard; */}