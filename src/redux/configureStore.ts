import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { game } from '../pages/Game/Game.reducer'

function configureStore () {
  const store = createStore(
    combineReducers<AppState>({
      game
    }),
    compose(
      applyMiddleware(thunk)
    )
  )
  return store
}

export default configureStore
