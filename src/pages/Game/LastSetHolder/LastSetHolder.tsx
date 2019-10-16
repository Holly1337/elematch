import React from 'react'
import { getScoreForSet } from '../../../util/score'
import Card from '../../../GenericComponents/Card/Card'
import { connect } from 'react-redux'
import { Col, Row } from 'react-bootstrap'

interface OwnProps {}
interface StateProps {
  completedSets: ElementCard[][]
}
interface DispatchProps {}
type Props = OwnProps & StateProps & DispatchProps

const LastSetHolder: React.FC<Props> = ({ completedSets }) => {
  const lastCompletedSet = completedSets.pop()
  if (!lastCompletedSet) {
    return null
  }

  const [card1, card2, card3] = lastCompletedSet
  const score = getScoreForSet(card1, card2, card3)
  const cards = [card1, card2, card3].sort(
    (c1, c2) => (c1.amount - c2.amount)
  )

  return (
    <div>
      <Row>
        {
          cards.map(card => (
            // TOOD: change the key to something that makes sense
            <Col key={JSON.stringify(card)} md={4} sm={4} xs={4}>
              <Card card={card} />
            </Col>
          ))
        }
      </Row>
      <h1>+{score}</h1>
    </div>
  )
}

const mapStateToProps = (state: AppState): StateProps => ({
  completedSets: state.game.completedSets
})

export default connect(
  mapStateToProps
)(LastSetHolder)