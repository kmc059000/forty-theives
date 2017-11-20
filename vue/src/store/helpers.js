import { range } from 'lodash';
import { flow, shuffle } from 'lodash/fp';

export function topCard(stack) {
  return stack && stack.length && stack[stack.length - 1];
}

export function anyCards(stack) {
  return !!stack.length;
}

export function pushCard(stack, card) {
  stack.push(card);
}

export function popCard(stack) {
  return stack.length && stack.pop();
}

export function canDropOnOpenCard(sourceCard, card) {
  return sourceCard.cardNumber - card.cardNumber === 1 && sourceCard.cardSuit === card.cardSuit;
}

export function canDropOnDropStackCard(sourceCard, card) {
  if (!card) {
    return sourceCard.cardNumber === 1;
  }

  return sourceCard.cardNumber - card.cardNumber === 1 && sourceCard.cardSuit === card.cardSuit;
}

export function generateDeck() {
  const consts = {
    cardNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    cardSuits: ['C', 'D', 'S', 'H'],
  };

  let deck = [];

  range(2).forEach(() => {
    consts.cardNumbers.forEach((cardNumber) => {
      consts.cardSuits.forEach((cardSuit) => {
        deck.push({
          cardNumber,
          cardSuit,
          selected: false,
        });
      });
    });
  });

  // one shuffle didnt seem all that random. Similar cards seemed to be right next to each other
  deck = flow(
    shuffle,
    shuffle,
    shuffle,
  )(deck);

  return deck;
}
