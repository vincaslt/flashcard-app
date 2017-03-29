// @flow

import { connect } from 'react-redux'
import Flashcard from '../components/Flashcard'
import { actions, getCurrentCard, getLastAnswer } from '../reducers/flashcard'

const mapStateToProps = (state) => ({
  card: getCurrentCard(state),
  lastAnswer: getLastAnswer(state)
})

const mapDispatchToProps = {
  submit: (answer: string) => actions.submit(answer)
}

export default connect(mapStateToProps, mapDispatchToProps)(Flashcard)