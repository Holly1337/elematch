import React from 'react'
import { Container } from 'react-bootstrap'
import CardHolder from './CardHolder/CardHolder'
import background from '../../assets/images/background-with-area.png'

const Game = () => {
  return (
    <div
      className='background'
      // style={{
      //   backgroundImage: `url('${background}')`,
      //   height: '100vh',
      //   backgroundSize: 'contain'
      // }}
    >
      <Container>
        <CardHolder />
      </Container>
    </div>

  )
}

export default Game
