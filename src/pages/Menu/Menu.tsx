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
import { TIME_HUNT, TIME_NORMAL } from '../../constants/gameplay'

interface OwnProps {}
interface StateProps {}
interface DispatchProps {
  startGame: (time: number, gameMode: GameMode) => void
}
type Props = OwnProps & StateProps & DispatchProps

const Menu: React.FC<Props> = ({ startGame }) => {
  const history = useHistory()

  const onStartNormalGame = () => {
    startGame(TIME_NORMAL, GameMode.NORMAL)
    history.push(routes.GAME)
  }

  const onStartTimeHuntGame = () => {
    startGame(TIME_HUNT, GameMode.TIME_HUNT)
    history.push(routes.GAME)
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
  startGame: (time: number, gameMode: GameMode) => { dispatch(startGame(time, gameMode)) },
})

export default connect(
  null,
  mapDispatchToProps
)(Menu)
