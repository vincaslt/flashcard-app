// @flow

import React, { PureComponent } from 'react'
import { Header, Segment, Input } from 'semantic-ui-react'
import Box from './Box'
import ColoredSegment from './ColoredSegment'
import type { PropTypes, LastAnswerType } from 'fl-flashcard'
import { colors } from '../../constants'

export default class Flashcard extends PureComponent {
  props: PropTypes
  state = {
    text: ''
  }

  _submit = ({ key }: SyntheticKeyboardEvent) => {
    if (key === 'Enter') {
      this.props.submit(this.state.text)
      this.setState({ text: '' })
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
          <ColoredSegment blinkColor={blinkColor}>
            <Header as="h3">{word}</Header>
          </ColoredSegment>
          <Segment>
            <Input
              value={this.state.text}
              onChange={this._onTextChange}
              placeholder={meaning}
              onKeyPress={this._submit}
            />
            {lastAnswer && !lastAnswer.status ? `${lastAnswer.answer} is incorrect` : ''}
          </Segment>
        </Segment.Group>
      </Box>
    )
  }
}
