// @flow

import React from 'react'
import type { Children } from 'react'
import CourseResults from '../../containers/CourseResults'

type PropTypes = {
  children: Children,
  isComplete: boolean
}

const Course = ({ children, isComplete, ...rest }: PropTypes) => (
  isComplete
    ? <CourseResults />
    : React.cloneElement(children, {...rest})
)

export default Course