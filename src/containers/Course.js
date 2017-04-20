// @flow

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Course from '../components/Course'
import { getIsComplete } from '../reducers/course'
import { actions as courseActions } from '../reducers/course'

class CourseContainer extends PureComponent {
  componentWillMount() {
    this.props.requestCourseLoad()
  }

  render() {
    const { requestCourseLoad, getIsComplete, ...rest } = this.props
    return (
      <Course {...rest} isComplete={getIsComplete()} />
    )
  }
}

const mapStateToProps = (state) => ({
  getIsComplete: () => getIsComplete(state)
})

const mapDispatchToProps = {
  requestCourseLoad: courseActions.requestCourseLoad
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseContainer)