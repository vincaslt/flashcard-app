// @flow

import React from 'react'
import type { CourseQuestionType } from 'fl-course'
import { Table, Header } from 'semantic-ui-react'
import { WordStatus } from '../../constants'
import StrengthMeter from '../StrengthMeter'

// TODO: only select relevant statistics not everything
type PropTypes = {
  questions: Array<CourseQuestionType>
}

const mapStatusToValue = (status) => {
  return {
    [WordStatus.NEW]: 0,
    [WordStatus.FRESH]: 1,
    [WordStatus.AVERAGE]: 2,
    [WordStatus.OLD]: 3,
    [WordStatus.NEVER]: 4
  }[status] || 0
}

const CourseResults = ({ questions, ...rest }: PropTypes) => {
  const rows = questions.map(question => (
    <Table.Row key={question.word + question.meaning}>
      <Table.Cell>{question.word}</Table.Cell>
      <Table.Cell>{question.meaning}</Table.Cell>
      <Table.Cell>
        <StrengthMeter
          value={mapStatusToValue(question.status)}
          max={mapStatusToValue(WordStatus.NEVER)}
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