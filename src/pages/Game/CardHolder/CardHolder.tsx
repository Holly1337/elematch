import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import SelectableCard from './SelectableCard/SelectableCard'
import {motion} from 'framer-motion'

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
        <Col md={3} sm={4} xs={4} key={card.id}>
          <motion.div
            key={card.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              ease: 'linear',
              duration: 0.1,
              delay: (0.025 * index)
            }}
          >
            <SelectableCard card={card} index={index} />
          </motion.div>
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
