interface GameState {
  score: number // we might also calculate this by iterating the "completedSets" property
  timeRemaining: number
  currentCards: ElementCard[]
  completedSets: ElementCard[][]
  selectedCardIndexes: Set<number>
}

type ElementCardSet = ElementCard[] // TODO: change to [ElementCard, ElementCard, ElementCard]?

type CardElement = 'Fire' | 'Water' | 'Energy'
type CardColor = 'Red' | 'Blue' | 'Yellow'

interface ElementCard {
  element: CardElement,
  color: CardColor,
  amount: 1 | 2 | 3
}
