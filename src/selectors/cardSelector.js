export default (cards, id) => {
  return cards.find(card => card.id === id);
};