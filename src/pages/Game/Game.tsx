import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import CardHolder from './CardHolder/CardHolder'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { addToScore, deselectCards, setCurrentCards, startGame } from './Game.actions'
import { getSelectedCards } from './Game.reducer'
import { AMOUNT_TO_SELECT } from '../../constants/gameplay'
import { getDeck, getSetDifficulty, isValidSet } from '../../util/deck'
import ScoreDisplay from './ScoreDisplay/ScoreDisplay'

interface OwnProps {}
interface StateProps {
  selectedCards: ElementCard[]
}
interface DispatchProps {
  setCurrentCards: (cards: ElementCard[]) => void
  deselectCards: () => void
  addToScore: (score: number) => void
  startGame: (time: number) => void
}
type Props = OwnProps & StateProps & DispatchProps

const Game: React.FC<Props> = ({ setCurrentCards, selectedCards, deselectCards, addToScore, startGame }) => {
  useEffect(() => {
    startGame(99)
  }, [])

  useEffect(() => {
    const deck = getDeck()
    if (deck) {
      setCurrentCards(deck)
    }

  }, [setCurrentCards])

  useEffect(() => {
    // of 3 cards are selected
    if (selectedCards.length >= AMOUNT_TO_SELECT) {
      const [card1, card2, card3] = selectedCards
      const isValid = isValidSet(card1, card2, card3)
      deselectCards()

      if (!isValid) {
        console.log('ZONK')
      } else {
        const difficulty = getSetDifficulty(card1, card2, card3)
        const points = difficulty * 10
        addToScore(points)
        const deck = getDeck()
        if (deck) {
          setCurrentCards(deck)
        }
      }
    }
  }, [selectedCards])

  return (
    <div
      className='background'
      // style={{
      //   backgroundImage: `url('${background}')`,
      //   height: '100vh',
      //   backgroundSize: 'contain'
      // }}
    >
      <Container>
        <CardHolder />
        <ScoreDisplay />
      </Container>
    </div>

  )
}

const mapStateToProps = (state: AppState): StateProps => ({
  selectedCards: getSelectedCards(state.game)
})

const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps): DispatchProps => ({
  setCurrentCards: cards => { dispatch(setCurrentCards(cards)) },
  deselectCards: () => { dispatch(deselectCards()) },
  addToScore: (score: number) => { dispatch(addToScore(score)) },
  startGame: (time: number) => { dispatch(startGame(time)) }
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game)
