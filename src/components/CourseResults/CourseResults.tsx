import * as React from 'react'
import { Table, Header } from 'semantic-ui-react'
import StrengthMeter from '../StrengthMeter'

// TODO: only select relevant statistics not everything
interface Props {
  questions: Course.Question[]
}

// TODO: move to strength meter maybe
const mapStatusToValue = (status: Course.WordStatus) => {
  return {
    'new': 0,
    'fresh': 1,
    'average': 2,
    'old': 3,
    'never': 4
  }[status] || 0
}

const CourseResults = ({ questions, ...rest }: Props) => {
  const rows = questions.map(question => (
    <Table.Row key={question.word + question.meaning}>
      <Table.Cell>{question.word}</Table.Cell>
      <Table.Cell>{question.meaning}</Table.Cell>
      <Table.Cell>
        <StrengthMeter
          value={mapStatusToValue(question.status)}
          max={mapStatusToValue('never')}
        />
      </Table.Cell>
    </Table.Row>
  ))

  return (
    <div>
      <Header as="h1">
        Course finished!
        <Header.Subheader>See what words you have learnt below</Header.Subheader>
      </Header>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Word</Table.HeaderCell>
            <Table.HeaderCell>Meaning</Table.HeaderCell>
            <Table.HeaderCell>Strength</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {rows}
        </Table.Body>
      </Table>
    </div>
  )
}

export default CourseResults