// @flow

import React, { PureComponent } from 'react'
import { Header, Segment, Input } from 'semantic-ui-react'
import Box from './Box'
import ColoredSegment from './ColoredSegment'

type PropTypes = {
  word: string,
  meaning: string,
  submit: Function
}

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
    const { word, meaning } = this.props
    return (
      <Box>
        <Segment.Group>
          <ColoredSegment><Header as="h3">{word}</Header></ColoredSegment>
          <Segment>
            <Input
              value={this.state.text}
              onChange={this._onTextChange}
              placeholder={meaning}
              onKeyPress={this._submit}
            />
          </Segment>
        </Segment.Group>
      </Box>
    )
  }
}
