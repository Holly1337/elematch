import React, { useCallback, useEffect } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { changeTimeRemaining, setTimeRemaining } from '../../Game.actions'
import { useHistory } from 'react-router'
import { routes } from '../../../../constants/routes'

interface OwnProps {}
interface StateProps {
  timeRemaining: number | null
}
interface DispatchProps {
  changeTimeRemaining: (time: number) => void
  clearTime: () => void
}
type Props = OwnProps & StateProps & DispatchProps

const Timer: React.FC<Props> = ({ timeRemaining, changeTimeRemaining, clearTime }) => {
  let history = useHistory()

  const reduceTimeByOne = useCallback(() => {
    changeTimeRemaining(-1)
  }, [changeTimeRemaining])

  useEffect(() => {
    const newInterval = window.setInterval(reduceTimeByOne, 1000)

    return () => { window.clearInterval(newInterval) }
  }, [reduceTimeByOne])

  useEffect(() => {
    if (typeof timeRemaining === 'number' && timeRemaining <= 0) {
      clearTime()
      history.push(routes.GAME_OVER)
    }
  }, [timeRemaining])

  if (typeof timeRemaining !== 'number') {
    return null
  }

  return (
    <h2>
      Time Left: {timeRemaining}
    </h2>
  )
}

const mapStateToProps = (state: AppState): StateProps => ({
  timeRemaining: state.game.timeRemaining
})

const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps): DispatchProps => ({
  changeTimeRemaining: (timeRemaining: number) => { dispatch(changeTimeRemaining(timeRemaining)) },
  clearTime: () => { dispatch(setTimeRemaining(null)) }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Timer)
