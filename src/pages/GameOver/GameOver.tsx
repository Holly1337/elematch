import React, { useEffect, useState } from 'react'
import Page from '../Page'
import background from '../../assets/images/background-gameover.png'
import playAgainButton from '../../assets/images/buttons/button-playagain.png'
import { useHistory } from 'react-router'
import { routes } from '../../constants/routes'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { resetGame, startGame } from '../Game/Game.actions'
import { GameMode } from '../../Types/enums'

interface OwnProps {}
interface StateProps {
  score: number
  gameMode: GameMode
}
interface DispatchProps {
  resetGame: () => void
  startGame: (gameMode: GameMode) => void
}
type Props = OwnProps & StateProps & DispatchProps

const GameOver: React.FC<Props> = ({ score, gameMode, resetGame, startGame }) => {
  const [lastGameMode, setLastGameMode] = useState<GameMode>(gameMode)
  const history = useHistory()

  useEffect(() => {
    resetGame()
  }, [])

  const onStartGame = () => {
    startGame(lastGameMode)
    history.push(routes.GAME)
  }

  return (
    <Page backgroundImage={background}>
      <div
        className='d-flex vh-100 align-items-center justify-content-center'
      >
        <div style={{marginTop: 50}}>
          <h1 className='text-center' style={{ fontSize: 120 }}>{score}</h1>
          <img
            src={playAgainButton}
            alt={'play again button'}
            onClick={onStartGame}
            className='cursor-pointer'
            style={{
              marginTop: 40
            }}
          />
        </div>
      </div>
    </Page>
  )
}

const mapStateToProps = (state: AppState): StateProps => ({
  score: state.game.score,
  gameMode: state.game.gameMode
})

const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps): DispatchProps => ({
  resetGame: () => { dispatch(resetGame()) },
  startGame: (gameMode: GameMode) => { dispatch(startGame(gameMode)) }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameOver)
