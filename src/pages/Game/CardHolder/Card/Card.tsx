import React from 'react'
import { Dispatch } from 'redux'
import energyBlue1Full from '../../../../assets/images/cards/energy-blue-1-full.png'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { toggleCardSelected } from '../../Game.actions'
import { getImageForCard } from '../../../../util/cardImageLoader'

interface OwnProps {
  card: ElementCard
  index: number
}
interface StateProps {
  isSelected: boolean
}
interface DispatchProps {
  toggleSelected: (index: number) => void
}
type Props = OwnProps & StateProps & DispatchProps

const Card: React.FC<Props> = ({ card, index, isSelected, toggleSelected }) => {
  const className = classnames(
    'element-card d-flex justify-content-center align-items-center'
  )
  const imageClassname = classnames({
    'card-image': true,
    'card-image-selected': isSelected
  })

  const toggleIsSelected = () => {
    toggleSelected(index)
  }

  return (
    <div className={className}>
      <img
        src={getImageForCard(card)}
        className={imageClassname}
        onClick={toggleIsSelected}
        alt=''
      />
    </div>
  )
}

const mapStateToProps = (state: AppState, ownProps: OwnProps): StateProps => ({
  isSelected: state.game.selectedCardIndexes.has(ownProps.index)
})

const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps): DispatchProps => ({
  toggleSelected: (index: number) => { dispatch(toggleCardSelected(index)) }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Card)
