import {
  ADD_COMPLETED_SET,
  ADD_TO_SCORE,
  CHANGE_TIME_REMAINING,
  ChangeTimeRemainingAction,
  DESELECT_CARDS,
  GameActions,
  RESET_GAME,
  SET_CURRENT_CARDS,
  SET_SCORE,
  SET_TIME_REMAINING,
  START_GAME, StartGameAction,
  TOGGLE_CARD_SELECTED,
  ToggleCardSelectedAction
} from './Game.actions'
import { GameMode } from '../../Types/enums.d'
import { TIME_HUNT, TIME_NORMAL } from '../../constants/gameplay'

const getDefaultSelected = () => new Set<number>()
const getDefaultGameMode = () => GameMode.NORMAL

const getDefaultState = (): GameState => ({
  score: 0,
  timeRemaining: null,
  currentCards: [],
  completedSets: [],
  selectedCardIndexes: getDefaultSelected(),
  gameMode: getDefaultGameMode()
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
    let timeRemaining = state.timeRemaining + action.amount
    timeRemaining = Math.max(timeRemaining, 0)
    return {
      ...state,
      timeRemaining: timeRemaining
    }
  }
  return state
}


const startGame = (state: GameState, action: StartGameAction): GameState => {
  let timeRemaining = 0
  switch (action.gameMode) {
    case GameMode.TIME_HUNT:
      timeRemaining = TIME_HUNT
      break
    case GameMode.NORMAL:
      timeRemaining = TIME_NORMAL
      break
  }
  console.log('time remaining:', timeRemaining)

  return {
    ...getDefaultState(),
    timeRemaining: timeRemaining,
    gameMode: action.gameMode
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
      return startGame(state, action)
    case RESET_GAME:
      return {
        ...getDefaultState()
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
