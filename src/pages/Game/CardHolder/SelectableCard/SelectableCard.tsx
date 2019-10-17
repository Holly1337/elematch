import React from 'react'
import { Dispatch } from 'redux'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { toggleCardSelected } from '../../Game.actions'
import { getImageForCard } from '../../../../util/cardImageLoader'
import { getSelectedCards } from '../../Game.reducer'
import { motion, useAnimation } from 'framer-motion'
import { isValidSet } from '../../../../util/deck'
import { audio } from '../../../../util/audio'

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

  const className = classnames(
    'element-card d-flex justify-content-center align-items-center'
  )

  if (
    isSelected
    && selectedCards.length === 3
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
    'card-image-selected': isSelected
  })

  const toggleIsSelected = () => {
    toggleSelected(index)
  }

  const onClick = () => {
    if (!isSelected) {
      switch (selectedCards.length) {
        case 0:
          audio.select1.play()
          break
        case 1:
          audio.select2.play()
          break
      }
      controls.start({
        scale: [1.0, 1.05, 1.0],
      })
    }
    toggleIsSelected()
  }

  return (
    <div
      className={className}
    >
      <motion.div
        animate={controls}
        transition={{ ease: "easeInOut", duration: 0.15 }}
      >
        <img
          src={getImageForCard(card)}
          className={imageClassname}
          onClick={onClick}
          alt=''
          draggable={false}
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
