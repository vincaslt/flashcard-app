import * as React from 'react'
import { connect } from 'react-redux'
import { ActionFunctionAny } from 'redux-actions'
import Course, { Props as CourseProps } from '../components/Course'
import { isComplete, actions as courseActions } from '../reducers/course'
import { State } from '../reducers'

interface Props extends CourseProps {
  requestCourseLoad: ActionFunctionAny<{}>
}

class CourseContainer extends React.PureComponent<Props, {}> {
  componentWillMount() {
    this.props.requestCourseLoad()
  }

  render() {
    const { requestCourseLoad, ...rest } = this.props
    return (
      <Course {...rest} />
    )
  }
}

const mapStateToProps = (state: State) => ({
  isComplete: isComplete(state)
})

const mapDispatchToProps = {
  requestCourseLoad: courseActions.requestCourseLoad
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseContainer)