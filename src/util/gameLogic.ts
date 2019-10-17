import { Dispatch } from 'redux'
import { getDeck, getSetDifficulty, isValidSet } from './deck'
import {
  addCompletedSet,
  addToScore,
  deselectCards,
  setCurrentCards,
  setTimeRemaining
} from '../pages/Game/Game.actions'
import { playSelectFail, playSelectSet } from './audio'
import { GameMode } from '../Types/enums.d'
import { TIME_HUNT } from '../constants/gameplay'
import { getSelectedCards } from '../pages/Game/Game.reducer'

export const placeNewCards = (dispatch: Dispatch) => {
  const deck = getDeck()
  if (deck) {
    dispatch(setCurrentCards(deck))
  }
}

export const onCardSelect = (gameState: GameState, dispatch: Dispatch) => {
  const selectedCards: ElementCard[] = getSelectedCards(gameState)
  // the check happens after 3 cards are selected so the animation library will still work --> cards wiggle when failed
  if (selectedCards.length >= 3) {
    const [card1, card2, card3] = selectedCards
    const isValid = isValidSet(card1, card2, card3)
    dispatch(deselectCards())

    if (!isValid) {
      playSelectFail()
      return
    }

    // is valid
    playSelectSet()
    const difficulty = getSetDifficulty(card1, card2, card3)
    const points = difficulty * 10
    dispatch(addToScore(points))
    const set = [...selectedCards]
    dispatch(addCompletedSet(set))
    placeNewCards(dispatch)

    if (gameState.gameMode === GameMode.TIME_HUNT) {
      const timeRemaining = gameState.timeRemaining
      if (timeRemaining === null) {
        return
      }
      const timeToAdd = difficulty * 2
      const newTimeRemaining = Math.min(TIME_HUNT, timeRemaining + timeToAdd)
      dispatch(setTimeRemaining(newTimeRemaining))
    }
  }
}

// export const startGame = (gameMode: GameMode, dispatch: Dispatch) => {
//   if (gameMode === GameMode.TIME_HUNT) {
//     dispatch(setTimeRemaining(TIME_HUNT))
//   } else if (gameMode === GameMode.NORMAL) {
//     dispatch(setTimeRemaining(TIME_NORMAL))
//   }
//   placeNewCards(dispatch)
// }
