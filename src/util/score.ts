import { getSetDifficulty } from './deck'
import { DIFFICULTY_MULTIPLIER } from '../constants/gameplay'

export const getScoreForSet = (card1: ElementCard, card2: ElementCard, card3: ElementCard): number => {
  const difficulty = getSetDifficulty(card1, card2, card3)
  return difficulty * DIFFICULTY_MULTIPLIER
}
