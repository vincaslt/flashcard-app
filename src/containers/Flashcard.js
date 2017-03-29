// @flow

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Flashcard from '../components/Flashcard'
import { actions as flascardActions, getCurrentCard, getLastAnswer } from '../reducers/flashcard'
import { actions as courseActions } from '../reducers/course'

const mapStateToProps = (state) => ({
  card: getCurrentCard(state),
  lastAnswer: getLastAnswer(state)
})

const mapDispatchToProps = {
  submit: (answer: string) => flascardActions.submit(answer),
  requestCourseLoad: courseActions.requestCourseLoad
}

class FlashcardContainer extends PureComponent {
  componentWillMount() {
    this.props.requestCourseLoad()
  }

  render() {
    const { requestCourseLoad, ...rest } = this.props
    return (
      <Flashcard {...rest} />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FlashcardContainer)