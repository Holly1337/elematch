import React, { useState } from 'react'
import energyBlue1Full from '../../../../assets/images/cards/energy-blue-1-full.png'
import classnames from 'classnames'

interface Props {
  isSelected?: boolean
}

const Card: React.FC<Props> = (/*{isSelected} = { isSelected: false }*/) => {
  const [isSelected, setIsSelected] = useState(false)
  const className = classnames(
    'element-card d-flex justify-content-center align-items-center'
  )
  const imageClassname = classnames({
    'card-image': true,
    'card-image-selected': isSelected
  })

  const toggleIsSelected = () => {
    setIsSelected(!isSelected)
  }

  return (
    <div className={className}>
      <img
        src={energyBlue1Full}
        className={imageClassname}
        onClick={toggleIsSelected}
        alt=''
      />
    </div>
  )
}

export default Card
