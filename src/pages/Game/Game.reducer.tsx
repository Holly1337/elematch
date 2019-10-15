import {
  ADD_COMPLETED_SET,
  ADD_TO_SCORE, DESELECT_CARDS,
  GameActions,
  SET_CURRENT_CARDS,
  SET_SCORE,
  SET_TIME_REMAINING,
  TOGGLE_CARD_SELECTED, ToggleCardSelectedAction
} from './Game.actions'

const getDefaultSelected = () => new Set<number>()
const getDefaultState = (): GameState => ({
  score: 0,
  timeRemaining: 0,
  currentCards: [],
  completedSets: [],
  selectedCardIndexes: getDefaultSelected(),
})

const toggleCardSelected = (state: GameState, action: ToggleCardSelectedAction): GameState => {
  const newIndexes = new Set(state.selectedCardIndexes)
  let index = action.index
  if (state.selectedCardIndexes.has(index)) {
    newIndexes.delete(index)
  } else {
    newIndexes.add(index)
  }
  return {
    ...state,
    selectedCardIndexes: newIndexes
  }
}

export const game = (state: GameState = getDefaultState(), action: GameActions): GameState => {
  switch (action.type) {
    case SET_SCORE:
      return {
        ...state,
        score: action.score
      }
    case ADD_TO_SCORE:
      return {
        ...state,
        score: state.score + action.score
      }
    case SET_TIME_REMAINING:
      return {
        ...state,
        score: action.timeRemaining
      }
    case TOGGLE_CARD_SELECTED:
      return toggleCardSelected(state, action)
    case DESELECT_CARDS:
      return {
        ...state,
        selectedCardIndexes: getDefaultSelected()
      }
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

export const getSelectedCards = (state: GameState) => {
  const indexes = Array.from(state.selectedCardIndexes)
  const selectedCards = indexes.map(index => state.currentCards[index])
  return selectedCards
}
