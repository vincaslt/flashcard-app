import * as React from 'react'
import styled from 'styled-components'

// FIXME: ES6 import make it work
const star = require('./img/star.svg')
const starEmpty = require('./img/star_empty.svg')
const lastStar = require('./img/last.svg')
const lastStarEmpty = require('./img/last_empty.svg')

interface Props {
  isLast: boolean
  isEmpty: boolean
}

type StyledStarProps = Props & {
  size: 'tiny' | 'small' | 'normal' | 'large'
}

export const Star = ({ isLast, isEmpty, ...rest }: Props) => {
  const alt = isEmpty ? '()' : '(x)'
  return isLast
    ? <img src={isEmpty ? lastStarEmpty : lastStar} alt={alt} {...rest} />
    : <img src={isEmpty ? starEmpty : star} alt={alt} {...rest} />
}

const StyledStarWrapper = ({ size, ...rest }: StyledStarProps) => (
  <Star {...rest} />
)

const SIZE_MAP = {
  tiny: '15px',
  small: '30px',
  normal: '50px',
  large: '75px'
}

const StyledStar = styled(StyledStarWrapper)`
  width: ${props => SIZE_MAP[props.size]};
`

export default StyledStar