// @flow

import React, { Component } from 'react'
import { Header, Button, Segment } from 'semantic-ui-react'
import Input from './Input'
import StyledSegment from './Segment'
import Box from './Box'
import ColoredSegment from './ColoredSegment'
import type { PropTypes, LastAnswerType } from 'fl-flashcard'
import { colors } from '../../constants'

type StateType = {
  text: string,
  viewHash: ?number
}

export default class Flashcard extends Component {
  props: PropTypes
  state: StateType = {
    text: '',
    viewHash: null // Used to refresh blink component after submits
  }

  _onKeyPress = ({ key }: SyntheticKeyboardEvent) => {
    if (key === 'Enter') {
      this._submit()
    }
  }

  _submit = () => {
    this.props.submit(this.state.text)
    this.setState({ text: '', viewHash: Math.random() })
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
          <StyledSegment>
            <Input
              value={this.state.text}
              onChange={this._onTextChange}
              onKeyPress={this._onKeyPress}
              { ...(lastAnswer && !lastAnswer.correct) ? { placeholder: meaning } : {} }
            />
            <Button content='Next' icon='right arrow' labelPosition='right' onClick={this._submit} />
          </StyledSegment>
        </Segment.Group>
      </Box>
    )
  }
}
