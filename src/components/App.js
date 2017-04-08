// @flow

import React, { Component } from 'react'
import Flashcard from '../containers/Flashcard'
import Course from '../containers/Course'
import { Grid } from 'semantic-ui-react'

class App extends Component {
  render() {    
    return (
      <Grid centered>
        <Grid.Column width="4">
          <Course>
            <Flashcard></Flashcard>
          </Course>
        </Grid.Column>
      </Grid>
    )
  }
}

export default App
