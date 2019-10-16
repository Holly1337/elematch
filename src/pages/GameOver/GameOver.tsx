import React from 'react'
import Page from '../Page'
import background from '../../assets/images/background-gameover.png'
import playAgainButton from '../../assets/images/buttons/button-playagain.png'
import { useHistory } from 'react-router'
import { routes } from '../../constants/routes'
import { connect } from 'react-redux'

interface OwnProps {}
interface StateProps {
  score: number
}
interface DispatchProps {}
type Props = OwnProps & StateProps & DispatchProps

const GameOver: React.FC<Props> = ({ score }) => {
  const history = useHistory()

  const onStartGame = () => {
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
  score: state.game.score
})

export default connect(
  mapStateToProps
)(GameOver)
