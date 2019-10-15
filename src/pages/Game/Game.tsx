import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import CardHolder from './CardHolder/CardHolder'
import background from '../../assets/images/background-with-area.png'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { deselectCards, setCurrentCards } from './Game.actions'
import { getSelectedCards } from './Game.reducer'
import { AMOUNT_TO_SELECT } from '../../constants/gameplay'

interface OwnProps {}
interface StateProps {
  selectedCards: ElementCard[]
}
interface DispatchProps {
  setCurrentCards: (cards: ElementCard[]) => void
  deselectCards: () => void
}
type Props = OwnProps & StateProps & DispatchProps

const Game: React.FC<Props> = ({ setCurrentCards, selectedCards, deselectCards }) => {

  useEffect(() => {
    const attributes = [
      ['Fire', 'Water', 'Energy'],
      ['Red', 'Blue', 'Yellow'],
      [1, 2, 3],
    ]

    let allCards: ElementCard[] = []
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        for (let k = 0; k < 3; k++) {
          const card: ElementCard = {
            // @ts-ignore
            element: attributes[0][i],
            // @ts-ignore
            color: attributes[1][j],
            // @ts-ignore
            amount: attributes[2][k]
          }
          allCards.push(card)
        }
      }
    }

    const cards = allCards.splice(0, 12)

    setCurrentCards(cards)
  }, [setCurrentCards])

  useEffect(() => {
    if (selectedCards.length >= AMOUNT_TO_SELECT) {
      deselectCards()
    }
  }, [selectedCards])

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

const mapStateToProps = (state: AppState): StateProps => ({
  selectedCards: getSelectedCards(state.game)
})

const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps): DispatchProps => ({
  setCurrentCards: cards => { dispatch(setCurrentCards(cards)) },
  deselectCards: () => { dispatch(deselectCards()) }
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game)
