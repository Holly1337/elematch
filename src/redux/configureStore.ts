import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { game } from '../pages/Game/Game.reducer'

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

function configureStore () {
  const store = createStore(
    combineReducers<AppState>({
      game
    }),
    composeEnhancers(
      applyMiddleware(thunk)
    )
  )
  return store
}

export default configureStore
