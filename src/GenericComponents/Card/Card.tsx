import React from 'react'
import classnames from 'classnames'
import { getImageForCard } from '../../util/cardImageLoader'
import { ClassValue } from 'classnames/types'

interface Props {
  card: ElementCard
  containerClassName?: ClassValue
  imageClassName?: ClassValue,
  onClick?: () => void
}

const Card: React.FC<Props> = ({ card, containerClassName, imageClassName, onClick }) => {
  const className = classnames(
    containerClassName,
    'element-card d-flex justify-content-center align-items-center'
  )
  const imageClassname = classnames({
    'card-image': true
  }, imageClassName)

  return (
    <div className={className}>
      <img
        src={getImageForCard(card)}
        className={imageClassname}
        onClick={onClick}
        alt=''
        draggable={false}
      />
    </div>
  )
}

export default Card
