import React from 'react'
import { connect } from 'react-redux'
import Timer from './Timer/Timer'

interface OwnProps {}
interface StateProps {
  score: number
}
interface DispatchProps {}
type Props = OwnProps & StateProps & DispatchProps

const ScoreDisplay: React.FC<Props> = ({ score }) => {
  return (
    <div className='d-flex justify-content-between'>
      <h2>Score: {score}</h2>
      <Timer />
    </div>
  )
}

const mapStateToProps = (state: AppState): StateProps => ({
  score: state.game.score
})

export default connect(
  mapStateToProps
)(ScoreDisplay)
