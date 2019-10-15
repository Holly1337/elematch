import React from 'react'
import { connect } from 'react-redux'

interface OwnProps {}
interface StateProps {
  score: number
}
interface DispatchProps {}
type Props = OwnProps & StateProps & DispatchProps

const ScoreDisplay: React.FC<Props> = ({ score }) => {
  return (
    <h3>Score: {score}</h3>
  )
}

const mapStateToProps = (state: AppState): StateProps => ({
  score: state.game.score
})

export default connect(
  mapStateToProps
)(ScoreDisplay)
