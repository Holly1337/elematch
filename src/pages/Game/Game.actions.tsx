// Action set score
export const SET_SCORE = 'Game/SET_SCORE'

export interface SetScoreAction {
  type: typeof SET_SCORE,
  score: number
}

export function setScore (score: number): SetScoreAction {
  return {
    type: SET_SCORE,
    score
  }
}

// Action add to score
export const ADD_TO_SCORE = 'Game/ADD_TO_SCORE'

export interface AddToScoreAction {
  type: typeof ADD_TO_SCORE,
  score: number
}

export function addToScore (score: number): AddToScoreAction {
  return {
    type: ADD_TO_SCORE,
    score
  }
}

// Action set time remaining
export const SET_TIME_REMAINING = 'Game/SET_TIME_REMAINING'

export interface SetTimeRemainingAction {
  type: typeof SET_TIME_REMAINING,
  timeRemaining: number
}

export function setTimeRemaining (timeRemaining: number): SetTimeRemainingAction {
  return {
    type: SET_TIME_REMAINING,
    timeRemaining
  }
}

// Action toggle card selected
export const TOGGLE_CARD_SELECTED = 'Game/TOGGLE_CARD_SELECTED'

export interface ToggleCardSelectedAction {
  type: typeof TOGGLE_CARD_SELECTED,
  index: number
}

export function toggleCardSelected (index: number): ToggleCardSelectedAction {
  return {
    type: TOGGLE_CARD_SELECTED,
    index
  }
}

// Action deselect cards
export const DESELECT_CARDS = 'Game/DESELECT_CARDS'

export interface DeselectCardsAction {
  type: typeof DESELECT_CARDS
}

export function deselectCards (): DeselectCardsAction {
  return {
    type: DESELECT_CARDS
  }
}

// Action add completed set
export const ADD_COMPLETED_SET = 'Game/ADD_COMPLETED_SET'

export interface AddCompletedSetAction {
  type: typeof ADD_COMPLETED_SET,
  cardSet: ElementCardSet
}

export function addCompletedSet (cardSet: ElementCardSet): AddCompletedSetAction {
  return {
    type: ADD_COMPLETED_SET,
    cardSet
  }
}

// Action set current cards
export const SET_CURRENT_CARDS = 'Game/SET_CURRENT_CARDS'

export interface SetCurrentCardsAction {
  type: typeof SET_CURRENT_CARDS
  cards: ElementCard[]
}

export function setCurrentCards (cards: ElementCard[]): SetCurrentCardsAction {
  return {
    type: SET_CURRENT_CARDS,
    cards
  }
}

export type GameActions =
  SetScoreAction
  | AddToScoreAction
  | SetTimeRemainingAction
  | ToggleCardSelectedAction
  | DeselectCardsAction
  | AddCompletedSetAction
  | SetCurrentCardsAction
