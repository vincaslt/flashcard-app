// @flow

import { connect } from 'react-redux'
import Flashcard from '../components/Flashcard'
import { actions, getCurrentCard } from '../reducers/flashcard'

const mapStateToProps = (state) => ({
  ...getCurrentCard(state)
})

const mapDispatchToProps = {
  submit: (answer: string) => actions.submit(answer)
}

export default connect(mapStateToProps, mapDispatchToProps)(Flashcard)