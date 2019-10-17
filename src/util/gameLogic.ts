import { Dispatch } from 'redux'
import { getDeck, getSetDifficulty, isValidSet } from './deck'
import { addCompletedSet, addToScore, deselectCards, setCurrentCards } from '../pages/Game/Game.actions'
import { playSelectFail, playSelectSet } from './audio'

export const placeNewCards = (dispatch: Dispatch) => {
  const deck = getDeck()
  if (deck) {
    dispatch(setCurrentCards(deck))
  }
}

export const onCardSelect = (selectedCards: ElementCard[], dispatch: Dispatch) => {
  // the check happens after 3 cards are selected so the animation library will still work --> cards wiggle when failed
  if (selectedCards.length >= 3) {
    const [card1, card2, card3] = selectedCards
    const isValid = isValidSet(card1, card2, card3)
    dispatch(deselectCards())

    if (!isValid) {
      playSelectFail()
    } else {
      playSelectSet()
      const difficulty = getSetDifficulty(card1, card2, card3)
      const points = difficulty * 10
      dispatch(addToScore(points))
      const set = [...selectedCards]
      dispatch(addCompletedSet(set))
      placeNewCards(dispatch)
    }
  }
}
