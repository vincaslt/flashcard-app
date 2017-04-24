import { connect } from 'react-redux'
import Flashcard from '../components/Flashcard'
import { actions as flascardActions, currentCard, lastAnswer } from '../reducers/flashcard'
import { State } from '../reducers'

const mapStateToProps = (state: State) => ({
  card: currentCard(state),
  lastAnswer: lastAnswer(state)
})

const mapDispatchToProps = {
  submit: (answer: string) => flascardActions.submit(answer)
}

export default connect(mapStateToProps, mapDispatchToProps)(Flashcard)