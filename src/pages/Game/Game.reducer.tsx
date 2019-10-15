import {
  ADD_COMPLETED_SET,
  GameActions,
  SELECT_CARD,
  SelectCardAction, SET_CURRENT_CARDS,
  SET_SCORE,
  SET_TIME_REMAINING
} from './Game.actions'

const getDefaultState = (): GameState => ({
  score: 0,
  timeRemaining: 0,
  currentCards: [],
  completedSets: [],
  selectedCardIndexes: [],
})

const selectCard = (state: GameState, action: SelectCardAction): GameState => {
  return {
    ...state,
    selectedCardIndexes: [...state.selectedCardIndexes, action.index]
  }
}

export const game = (state: GameState = getDefaultState(), action: GameActions): GameState => {
  switch (action.type) {
    case SET_SCORE:
      return {
        ...state,
        score: action.score
      }
    case SET_TIME_REMAINING:
      return {
        ...state,
        score: action.timeRemaining
      }
    case SELECT_CARD:
      return selectCard(state, action)
    case ADD_COMPLETED_SET:
      return {
        ...state,
        completedSets: [...state.completedSets, action.cardSet]
      }
    case SET_CURRENT_CARDS:
      return {
        ...state,
        currentCards: action.cards
      }
  default:
    return state
  }
}
