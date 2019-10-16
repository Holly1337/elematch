import React, { useCallback, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { changeTimeRemaining } from '../../Game.actions'

interface OwnProps {}
interface StateProps {
  timeRemaining: number
}
interface DispatchProps {
  changeTimeRemaining: (time: number) => void
}
type Props = OwnProps & StateProps & DispatchProps

const Timer: React.FC<Props> = ({ timeRemaining, changeTimeRemaining }) => {
  const reduceTimeByOne = useCallback(() => {
    changeTimeRemaining(-1)
  }, [changeTimeRemaining])

  useEffect(() => {
    const newInterval = window.setInterval(() => {
      reduceTimeByOne()
    }, 1000)

    return () => {
      window.clearInterval(newInterval)
    }
  }, [reduceTimeByOne])

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
  changeTimeRemaining: (timeRemaining: number) => { dispatch(changeTimeRemaining(timeRemaining)) }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Timer)
