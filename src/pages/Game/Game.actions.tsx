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

// Action select card
export const SELECT_CARD = 'Game/SELECT_CARD'

export interface SelectCardAction {
  type: typeof SELECT_CARD,
  index: number
}

export function selectCard (index: number): SelectCardAction {
  return {
    type: SELECT_CARD,
    index
  }
}

// Action add completed set
export const ADD_COMPLETED_SET = 'Game/ADD_COMPLETED_SET'

export interface AddCompletedSetAction {
  type: typeof ADD_COMPLETED_SET,
  cardSet: CardSet
}

export function addCompletedSet (cardSet: CardSet): AddCompletedSetAction {
  return {
    type: ADD_COMPLETED_SET,
    cardSet
  }
}

// Action set current cards
export const SET_CURRENT_CARDS = 'Game/SET_CURRENT_CARDS'

export interface SetCurrentCardsAction {
  type: typeof SET_CURRENT_CARDS
  cards: Card[]
}

export function setCurrentCards (cards: Card[]): SetCurrentCardsAction {
  return {
    type: SET_CURRENT_CARDS,
    cards
  }
}

export type GameActions =
  SetScoreAction
  | SetTimeRemainingAction
  | SelectCardAction
  | AddCompletedSetAction
  | SetCurrentCardsAction
