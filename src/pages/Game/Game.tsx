import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import CardHolder from './CardHolder/CardHolder'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { addCompletedSet, addToScore, changeTimeRemaining, deselectCards, setCurrentCards } from './Game.actions'
import { getSelectedCards } from './Game.reducer'
import { getDeck, getSetDifficulty, isValidSet } from '../../util/deck'
import ScoreDisplay from './ScoreDisplay/ScoreDisplay'
import LastSetHolder from './LastSetHolder/LastSetHolder'
import background from '../../assets/images/background.png'
import Page from '../Page'
import { audio } from '../../util/audio'
import { GameMode } from '../../Types/enums'

interface OwnProps {}
interface StateProps {
  selectedCards: ElementCard[]
}
interface DispatchProps {
  setCurrentCards: (cards: ElementCard[]) => void
  deselectCards: () => void
  addToScore: (score: number) => void
  addCompletedSet: (set: ElementCard[]) => void
}
type Props = OwnProps & StateProps & DispatchProps

const Game: React.FC<Props> = (props) => {
  const { setCurrentCards, selectedCards, deselectCards, addToScore, addCompletedSet } = props

  const placeNewCards = () => {
    const deck = getDeck()
    if (deck) {
      setCurrentCards(deck)
    }
  }

  useEffect(() => {
    placeNewCards()
  }, [])

  useEffect(() => {
    // the check happens after 3 cards are selected so the animation library will still work --> cards wiggle when failed
    if (selectedCards.length >= 3) {
      const [card1, card2, card3] = selectedCards
      const isValid = isValidSet(card1, card2, card3)
      deselectCards()

      if (!isValid) {
        audio.selectFail.play()
      } else {
        audio.select3.play()
        const difficulty = getSetDifficulty(card1, card2, card3)
        const points = difficulty * 10
        addToScore(points)
        const set = [...selectedCards]
        addCompletedSet(set)
       placeNewCards()
      }
    }
  }, [selectedCards])

  return (
    <Page backgroundImage={background}>
      <Container>
        <CardHolder />
        <ScoreDisplay />
        <LastSetHolder />
      </Container>
    </Page>
  )
}

const mapStateToProps = (state: AppState): StateProps => ({
  selectedCards: getSelectedCards(state.game)
})

const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps): DispatchProps => ({
  setCurrentCards: cards => { dispatch(setCurrentCards(cards)) },
  deselectCards: () => { dispatch(deselectCards()) },
  addToScore: (score: number) => { dispatch(addToScore(score)) },
  addCompletedSet: (set: ElementCard[]) => { dispatch(addCompletedSet(set)) },
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game)
