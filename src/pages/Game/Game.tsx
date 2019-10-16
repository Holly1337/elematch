import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import CardHolder from './CardHolder/CardHolder'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import {
  addCompletedSet,
  addToScore,
  deselectCards,
  setCurrentCards,
  setTimeRemaining,
  startGame
} from './Game.actions'
import { getSelectedCards } from './Game.reducer'
import { AMOUNT_TO_SELECT, TIME_PER_ROUND } from '../../constants/gameplay'
import { getDeck, getSetDifficulty, isValidSet } from '../../util/deck'
import ScoreDisplay from './ScoreDisplay/ScoreDisplay'
import LastSetHolder from './LastSetHolder/LastSetHolder'
import background from '../../assets/images/background.png'
import Page from '../Page'
import { useHistory } from 'react-router'
import { routes } from '../../constants/routes'
import { audio } from '../../util/audio'

// import fail from '../../assets/sounds/select-fail.mp3'

interface OwnProps {}
interface StateProps {
  selectedCards: ElementCard[]
  timeRemaining: number | null
}
interface DispatchProps {
  setCurrentCards: (cards: ElementCard[]) => void
  deselectCards: () => void
  addToScore: (score: number) => void
  addCompletedSet: (set: ElementCard[]) => void
  startGame: (time: number) => void
  clearTime: () => void

}
type Props = OwnProps & StateProps & DispatchProps

const playFailSound = () => {
  audio.selectFail.play()
}

const Game: React.FC<Props> = ({ setCurrentCards, selectedCards, deselectCards, addToScore, startGame, addCompletedSet, timeRemaining, clearTime }) => {
  useEffect(() => {
    console.log('start game')
    startGame(TIME_PER_ROUND)

    return () => {
      console.log('game unmount')
    }
  }, [])

  useEffect(() => {
    const deck = getDeck()
    if (deck) {
      setCurrentCards(deck)
    }

  }, [setCurrentCards])

  useEffect(() => {
    if (selectedCards.length >= 3) {
      const [card1, card2, card3] = selectedCards
      const isValid = isValidSet(card1, card2, card3)
      deselectCards()

      if (!isValid) {
        playFailSound()
      } else {
        audio.select3.play()
        const difficulty = getSetDifficulty(card1, card2, card3)
        const points = difficulty * 10
        addToScore(points)
        const set = [...selectedCards]
        addCompletedSet(set)
        const deck = getDeck()
        if (deck) {
          setCurrentCards(deck)
        }
      }
    }
  }, [selectedCards])

  const history = useHistory()
  useEffect(() => {
    if (typeof timeRemaining === 'number' && timeRemaining <= 0) {
      clearTime()
      history.push(routes.GAME_OVER)
    }
  }, [timeRemaining])

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
  timeRemaining: state.game.timeRemaining,
  selectedCards: getSelectedCards(state.game)
})

const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps): DispatchProps => ({
  setCurrentCards: cards => { dispatch(setCurrentCards(cards)) },
  deselectCards: () => { dispatch(deselectCards()) },
  addToScore: (score: number) => { dispatch(addToScore(score)) },
  addCompletedSet: (set: ElementCard[]) => { dispatch(addCompletedSet(set)) },
  startGame: (time: number) => { dispatch(startGame(time)) },
  clearTime: () => { dispatch(setTimeRemaining(null)) },
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game)
