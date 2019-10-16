interface GameState {
  score: number // we might also calculate this by iterating the "completedSets" property
  timeRemaining: number
  currentCards: ElementCard[]
  completedSets: ElementCard[][]
  selectedCardIndexes: Set<number>
}

type ElementCardSet = ElementCard[] // TODO: change to [ElementCard, ElementCard, ElementCard]?

interface ElementCard {
  id: string
  element: CardElement,
  color: CardColor,
  amount: CardAmount
}
