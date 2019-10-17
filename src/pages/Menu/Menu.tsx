import React from 'react'
import Page from '../Page'
import background from '../../assets/images/background.png'
import { useHistory } from 'react-router'
import { routes } from '../../constants/routes'
import Button from '../../GenericComponents/Button'
import { GameMode } from '../../Types/enums.d'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { startGame } from '../Game/Game.actions'

interface OwnProps {}
interface StateProps {}
interface DispatchProps {
  startGame: (gameMode: GameMode) => void
}
type Props = OwnProps & StateProps & DispatchProps

const Menu: React.FC<Props> = ({ startGame }) => {
  const history = useHistory()

  const switchToGameRoute = () => {
    history.push(routes.GAME)
  }

  const onStartNormalGame = () => {
    startGame(GameMode.NORMAL)
    switchToGameRoute()
  }

  const onStartTimeHuntGame = () => {
    startGame(GameMode.TIME_HUNT)
    switchToGameRoute()
  }

  return (
    <Page backgroundImage={background}>
      <div
        className='d-flex vh-100 align-items-center justify-content-center'
      >
        <div>
          <div className='text-center mb-4'>
            <Button onClick={onStartNormalGame}>
              Normal Mode
            </Button>
          </div>
          <div className='text-center'>
            <Button onClick={onStartTimeHuntGame}>
              Time Hunt
            </Button>
          </div>
        </div>
      </div>
    </Page>
  )
}

const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps): DispatchProps => ({
  startGame: (gameMode: GameMode) => { dispatch(startGame(gameMode)) },
})

export default connect(
  null,
  mapDispatchToProps
)(Menu)
