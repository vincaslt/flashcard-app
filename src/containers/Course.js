// @flow

import { connect } from 'react-redux'
import Course from '../components/Course'
import { isComplete } from '../reducers/course'

const mapStateToProps = (state) => ({
  isComplete: isComplete(state)
})

export default connect(mapStateToProps)(Course)