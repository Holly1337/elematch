interface GameState {
  score: number // we might also calculate this by iterating the "completedSets" property
  timeRemaining: number
  currentCards: Card[]
  completedSets: Card[]
  selectedCardIndexes: Card[]
}

type CardSet = Card[] // TODO: change to [Card, Card, Card]?

interface Card {

}
