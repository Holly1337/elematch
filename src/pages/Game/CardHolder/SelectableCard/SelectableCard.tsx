import React, { useState } from 'react'
import { Dispatch } from 'redux'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { toggleCardSelected } from '../../Game.actions'
import { getImageForCard } from '../../../../util/cardImageLoader'
import { getSelectedCards } from '../../Game.reducer'
import { motion, useAnimation } from 'framer-motion'
import { isValidSet } from '../../../../util/deck'

interface OwnProps {
  card: ElementCard
  index: number
}
interface StateProps {
  selectedCards: ElementCard[]
  isSelected: boolean
}
interface DispatchProps {
  toggleSelected: (index: number) => void
}
type Props = OwnProps & StateProps & DispatchProps

const SelectableCard: React.FC<Props> = ({ card, index, isSelected, toggleSelected, selectedCards }) => {
  const controls = useAnimation()

  const [selectedCardsLength, setSelectedCardsLength] = useState(0)
  const [isRotated, setIsRotated] = useState(false)

  const className = classnames(
    'element-card d-flex justify-content-center align-items-center'
  )

  if (
    isSelected
    && selectedCards.length === 3
    && !isRotated
  ) {
    const [card1, card2, card3] = selectedCards
    if (!isValidSet(card1, card2, card3)) {
      controls.start({
        rotate: ['0deg', '5deg', '0deg', '-5deg', '0deg'],
      })
    }
  }

  const imageClassname = classnames({
    'card-image': true,
    'card-image-selected': isSelected,
    // 'card-image-rotated': isRotated
  })

  const toggleIsSelected = () => {
    toggleSelected(index)
  }


  return (
    <div
      className={className}
    >
      <motion.div
        animate={controls}
        transition={{ ease: "easeInOut", duration: 0.2 }}
      >
        <img
          src={getImageForCard(card)}
          className={imageClassname}
          onClick={toggleIsSelected}
          alt=''
        />
      </motion.div>
    </div>
  )
}

const mapStateToProps = (state: AppState, ownProps: OwnProps): StateProps => ({
  selectedCards: getSelectedCards(state.game),
  isSelected: state.game.selectedCardIndexes.has(ownProps.index)
})

const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps): DispatchProps => ({
  toggleSelected: (index: number) => { dispatch(toggleCardSelected(index)) }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectableCard)
