import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import CardHolder from './CardHolder/CardHolder'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { getSelectedCards } from './Game.reducer'
import ScoreDisplay from './ScoreDisplay/ScoreDisplay'
import LastSetHolder from './LastSetHolder/LastSetHolder'
import background from '../../assets/images/background.png'
import Page from '../Page'
import { onCardSelect, startGame } from '../../util/gameLogic'

interface OwnProps {}
interface StateProps {
  gameState: GameState
}
interface DispatchProps {
  dispatch: Dispatch
}
type Props = OwnProps & StateProps & DispatchProps

const Game: React.FC<Props> = (props) => {
  const { gameState, dispatch } = props
  const selectedCards = getSelectedCards(gameState)

  useEffect(() => {
    startGame(gameState, dispatch)
  }, [])

  useEffect(() => {
    onCardSelect(selectedCards, dispatch)
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
  gameState: state.game
})

const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps): DispatchProps => ({
  dispatch
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game)
