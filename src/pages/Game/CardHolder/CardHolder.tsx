import React from 'react'
import { Col, Row } from 'react-bootstrap'
import Card from './Card/Card'
import { connect } from 'react-redux'

interface OwnProps {}
interface StateProps {
  cards: ElementCard[]
}
interface DispatchProps {}
type Props = OwnProps & StateProps & DispatchProps

const CardHolder: React.FC<Props> = ({ cards }) => {
  return (
    <Row>
      {cards.map((card, index) => (
        <Col md={3} sm={4} key={index}>
          <Card card={card} index={index} />
        </Col>
      ))}
    </Row>
  )
}

const mapStateToProps = (state: AppState): StateProps => ({
  cards: state.game.currentCards
})

export default connect(
  mapStateToProps
)(CardHolder)
