// @flow

import { connect } from 'react-redux'
import CourseResult from '../components/CourseResults'
import { getAllQuestions } from '../reducers/course'

const mapStateToProps = (state) => ({
  questions: getAllQuestions(state)
})

export default connect(mapStateToProps)(CourseResult)