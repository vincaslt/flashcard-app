import * as React from 'react'
import CourseResults from '../../containers/CourseResults'

export interface Props {
  children: React.ReactElement<{}>
  isComplete: boolean
}

const Course = ({ children, isComplete, ...rest }: Props) => (
  isComplete
    ? <CourseResults />
    : React.cloneElement(children, {...rest})
)

export default Course