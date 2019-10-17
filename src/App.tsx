import React from 'react'
import { IonApp } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css'
import 'bootstrap/dist/css/bootstrap.css'
import './assets/css/style.scss'
/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'
/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'
/* Theme variables */
import './theme/variables.css'
import Game from './pages/Game/Game'
import { Provider } from 'react-redux'
import configureStore from './redux/configureStore'
import Menu from './pages/Menu/Menu'
import { routes } from './constants/routes'
import { Route } from 'react-router'
import GameOver from './pages/GameOver/GameOver'

const App: React.FC = () => {
  const store = configureStore()
  return (
    <Provider store={store}>
      <IonApp>
        <IonReactRouter>
            <Route exact path={routes.MENU} component={Menu} />
            <Route exact path={routes.GAME} component={Game}>
              <Game />
            </Route>
            <Route exact path={routes.GAME_OVER} component={GameOver} />
        </IonReactRouter>
      </IonApp>
    </Provider>
  )
};

export default App;
