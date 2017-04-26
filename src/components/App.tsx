import * as React from 'react'
import Flashcard from '../containers/Flashcard'
import Course from '../containers/Course'
import { Grid } from 'semantic-ui-react'

const App = () => (
  <Grid centered>
    <Grid.Column widescreen="4" computer="7" tablet="10" mobile="16">
      <Course>
        <Flashcard />
      </Course>
    </Grid.Column>
  </Grid>
)

export default App
