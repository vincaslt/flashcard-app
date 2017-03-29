// @flow

import React, { Component } from 'react'
import { Header, Segment, Input } from 'semantic-ui-react'
import Box from './Box'
import ColoredSegment from './ColoredSegment'
import type { PropTypes, LastAnswerType } from 'fl-flashcard'
import { colors } from '../../constants'

export default class Flashcard extends Component {
  props: PropTypes
  state = {
    text: '',
    viewHash: null // Used to refresh blink component after submits
  }

  _submit = ({ key }: SyntheticKeyboardEvent) => {
    if (key === 'Enter') {
      this.props.submit(this.state.text)
      this.setState({ text: '', viewHash: Math.random() })
    }
  }

  _onTextChange = ({ target }: SyntheticInputEvent) => {
    this.setState({ text: target.value })
  }

  render() {
    const { word, meaning } = this.props.card
    const lastAnswer: ?LastAnswerType = this.props.lastAnswer
    let blinkColor = null

    if (lastAnswer) {
      blinkColor = lastAnswer.correct ? colors.success : colors.error
    }

    return (
      <Box>
        <Segment.Group>
          <ColoredSegment key={this.state.viewHash} blinkColor={blinkColor}>
            <Header as="h3">{word}</Header>
          </ColoredSegment>
          <Segment>
            <Input
              value={this.state.text}
              onChange={this._onTextChange}
              onKeyPress={this._submit}
              { ...(lastAnswer && !lastAnswer.correct) ? { placeholder: meaning } : {} }
            />
          </Segment>
        </Segment.Group>
      </Box>
    )
  }
}
