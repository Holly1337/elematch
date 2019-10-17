import React from 'react'
import { TIME_HUNT } from '../../../constants/gameplay'
import { connect } from 'react-redux'

const HEIGHT = 20

interface OwnProps {}
interface StateProps {
  timeRemaining: number | null
}
interface DispatchProps {}
type Props = OwnProps & StateProps & DispatchProps

const TimeHuntBar: React.FC<Props> = ({ timeRemaining }) => {
  if (timeRemaining === null) {
    return null
  }
  const progress = (timeRemaining / TIME_HUNT) * 100
  let color = 'green'
  if (progress < 75) {
    color = 'yellow'
  }
  if (progress < 50) {
    color = 'orange'
  }
  if (progress < 25) {
    color = 'darkorange'
  }
  if (progress < 10) {
    color = 'red'
  }
  
  return (
    <div className='ml-4 w-100'>
      <div
        style={{
          width: `${progress}%`,
          height: HEIGHT,
          backgroundColor: color,
          display: 'inline-block'
        }}
      />
      <div
        style={{
          width: `${(100 - progress)}%`,
          height: HEIGHT,
          backgroundColor: 'lightgrey',
          display: 'inline-block'
        }}
      />
    </div>
  )
}

const mapStateToProps = (state: AppState): StateProps => ({
  timeRemaining: state.game.timeRemaining
})

export default connect(
  mapStateToProps
)(TimeHuntBar)
