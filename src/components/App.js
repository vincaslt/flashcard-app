// @flow

import React, { Component } from 'react'
import Flashcard from '../containers/Flashcard'
import { Grid } from 'semantic-ui-react'

class App extends Component {
  render() {    
    return (
      <Grid centered>
        <Grid.Column width="4">
          <Flashcard></Flashcard>
        </Grid.Column>
      </Grid>
    )
  }
}

export default App
