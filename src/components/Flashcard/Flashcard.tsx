import * as React from 'react'
import { Header, Button, Segment } from 'semantic-ui-react'
import Input from './Input'
import StyledSegment from './Segment'
import Box from './Box'
import ColoredSegment from './ColoredSegment'
import { colors } from '../../constants'

interface State {
  text: string
  viewHash?: string|number
}

interface Props {
  card: Flashcard.Question
  submit: Function
  lastAnswer: Flashcard.LastAnswerType|null
}

export default class Flashcard extends React.Component<Props, State> {
  public state: State = {
    text: ''
  }

  _onKeyPress = ({ key }: React.KeyboardEvent<HTMLInputElement>) => {
    if (key === 'Enter') {
      this._submit()
    }
  }

  _submit = () => {
    this.props.submit(this.state.text)
    this.setState({ text: '', viewHash: Math.random() })
  }

  _onTextChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ text: target.value })
  }

  render() {
    const { word, meaning } = this.props.card
    const lastAnswer = this.props.lastAnswer
    let blinkColor: string = ''

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
            <Button content="Next" icon="right arrow" labelPosition="right" onClick={this._submit} />
          </StyledSegment>
        </Segment.Group>
      </Box>
    )
  }
}
