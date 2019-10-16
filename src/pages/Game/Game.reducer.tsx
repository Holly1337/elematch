import {
  ADD_COMPLETED_SET,
  ADD_TO_SCORE,
  CHANGE_TIME_REMAINING, ChangeTimeRemainingAction,
  DESELECT_CARDS,
  GameActions,
  SET_CURRENT_CARDS,
  SET_SCORE,
  SET_TIME_REMAINING,
  START_GAME,
  TOGGLE_CARD_SELECTED,
  ToggleCardSelectedAction
} from './Game.actions'

const getDefaultSelected = () => new Set<number>()
const getDefaultState = (): GameState => ({
  score: 0,
  timeRemaining: null,
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

const changeTimeRemaining = (state: GameState, action: ChangeTimeRemainingAction): GameState => {
  if (typeof state.timeRemaining === 'number') {
    return {
      ...state,
      timeRemaining: state.timeRemaining + action.amount
    }
  }
  return state
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
        timeRemaining: action.timeRemaining
      }
    case CHANGE_TIME_REMAINING:
      return changeTimeRemaining(state, action)
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
    case START_GAME:
      return {
        ...getDefaultState(),
        timeRemaining: action.time
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
