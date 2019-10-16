import { CardAmount, CardColor, CardElement } from '../Types/enums.d'
import { v4 as uuidv4 } from 'uuid'
import { shuffleArray } from './arrayShuffle'

const cardAttributes: [
  [CardElement, CardElement, CardElement],
  [CardColor, CardColor, CardColor],
  [CardAmount, CardAmount, CardAmount]
] = [
  [CardElement.FIRE, CardElement.WATER, CardElement.ENERGY],
  [CardColor.RED, CardColor.BLUE, CardColor.YELLOW],
  [CardAmount.ONE, CardAmount.TWO, CardAmount.THREE],
]

export const getAllPossibleCards = (): ElementCard[] => {
  let allCards: ElementCard[] = []
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      for (let k = 0; k < 3; k++) {
        const card: ElementCard = {
          id: uuidv4(),
          element: cardAttributes[0][i],
          color: cardAttributes[1][j],
          amount: cardAttributes[2][k]
        }
        allCards.push(card)
      }
    }
  }
  return allCards
}

export const isValidSet = (card1: ElementCard, card2: ElementCard, card3: ElementCard) => {
  const elementsMatch = (
      card1.element === card2.element && card1.element === card3.element)
      || (card1.element !== card2.element && card1.element !== card3.element && card2.element !== card3.element
    )
  const colorsMatch = (
      card1.color === card2.color && card1.color === card3.color)
      || (card1.color !== card2.color && card1.color !== card3.color && card2.color !== card3.color
    )
  const amountsMatch = (
      card1.amount === card2.amount && card1.amount === card3.amount)
      || (card1.amount !== card2.amount && card1.amount !== card3.amount && card2.amount !== card3.amount
    )

  return elementsMatch && colorsMatch && amountsMatch
}

export const getSetDifficulty = (card1: ElementCard, card2: ElementCard, card3: ElementCard) => {
  let difficulty = 3
  if (card1.element === card2.element && card2.element === card3.element) {
    difficulty--
  }
  if (card1.color === card2.color && card2.color === card3.color) {
    difficulty--
  }
  if (card1.amount === card2.amount && card2.amount === card3.amount) {
    difficulty--
  }
  return difficulty
}

/**
 * Returns the card from the given stack that builds a set with the given cards. If the stack doesn't contain such a
 * card, the function returns false.
 *
 * @param card1
 * @param card2
 * @param stack
 * @returns {Card | boolean}
 */
let getLastCardForSet = (card1: ElementCard, card2: ElementCard, stack: ElementCard[]) => {
  let lastCard = stack.find(elem => isValidSet(card1, card2, elem))
  return typeof lastCard !== 'undefined' ? lastCard : false
}

/**
 * Get a set of 3 cards from the given stack. If the stack doesn't contain a set, the function returns false.
 */
let getSetFromStack = (cards: ElementCard[]) => {
  if (cards.length < 3) {
    return false
  }
  let card1 = cards.shift() as ElementCard

  for (let i = 0; i < cards.length; i++) {
    let card2 = cards[i];
    let card3 = getLastCardForSet(card1, card2, cards)

    if (card3) {
      return [card1, card2, card3]
    }
  }

  return false
}

// TODO: use a stack that is reduced after each set
export const getDeck = (): false | ElementCard[] => {
  let cards = getAllPossibleCards()
  cards = shuffleArray(cards)
  const set: false | ElementCard[] = getSetFromStack(cards);

  if (!set) {
    return false
  }

  const remainingCards: ElementCard[] = cards.filter(
    card => !set.includes(card)
  )

  const deck = [...set]
  while (deck.length < 12) {
    const cardToPush = remainingCards.pop()
    if (typeof cardToPush !== 'undefined') {  // should not happen
      deck.push(cardToPush)
    }
  }

  return shuffleArray(deck)
}
