import React from 'react'
import { ClassValue } from 'classnames/types'
import classNames from 'classnames'

interface Props {
  onClick: () => void
  buttonClassName?: ClassValue
}

const Button: React.FC<Props> = ({ children, onClick, buttonClassName }) => {
  const className = classNames('game-button', buttonClassName)
  return (
    <button
      className={className}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
