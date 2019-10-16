import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import SelectableCard from './SelectableCard/SelectableCard'

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
        <Col md={3} sm={4} xs={4} key={index}>
          <SelectableCard card={card} index={index} />
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
