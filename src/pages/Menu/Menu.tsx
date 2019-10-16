import React, { useEffect } from 'react'
import Page from '../Page'
import background from '../../assets/images/background.png'
import startGameButton from '../../assets/images/buttons/button-playnow.png'
import { RouteComponentProps, useHistory, withRouter } from 'react-router'
import { routes } from '../../constants/routes'

const Menu: React.FC = () => {
  const history = useHistory()
  useEffect(() => {
    console.log('menu mounted')
    return () => {
      console.log('menu unmounted')
    }
  }, [])

  const onStartGame = () => {
    history.push(routes.GAME)
  }

  return (
    <Page backgroundImage={background}>
      <div
        className='d-flex vh-100 align-items-center justify-content-center'
      >
        <img
          src={startGameButton}
          alt={'play now button'}
          onClick={onStartGame}
          className='cursor-pointer'
        />
      </div>
    </Page>
  )
}

export default Menu