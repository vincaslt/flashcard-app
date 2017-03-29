// @flow

import React from 'react'
import { Segment } from 'semantic-ui-react'
import styled, { keyframes } from 'styled-components'
import { colors } from '../../constants'

type PropTypes = {
  blinkColor: ?string
}

const blink = blinkColor => (keyframes`
  0% {
    background-color: ${blinkColor};
  }

  30% {
    background-color: ${blinkColor};
  }

  100% {
    background-color: ${colors.shadow};
  }
`)

const SegmentWrapper = ({ blinkColor, ...rest }: PropTypes) => (
  <Segment {...rest} />
)

const ColoredSegment = styled(SegmentWrapper)`
  animation: ${props => blink(props.blinkColor)} 0.7s !important;
  background-color: ${colors.shadow} !important;
`

export default ColoredSegment