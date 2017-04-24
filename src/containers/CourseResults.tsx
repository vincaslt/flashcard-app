import { connect } from 'react-redux'
import CourseResult from '../components/CourseResults'
import { allQuestions } from '../reducers/course'
import { State } from '../reducers'

const mapStateToProps = (state: State) => ({
  questions: allQuestions(state)
})

export default connect(mapStateToProps)(CourseResult)