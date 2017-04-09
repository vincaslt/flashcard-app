// @flow

import React from 'react'
import styled from 'styled-components'
import star from './img/star.svg'
import starEmpty from './img/star_empty.svg'
import lastStar from './img/last.svg'
import lastStarEmpty from './img/last_empty.svg'

type PropTypes = {
  isLast: boolean,
  isEmpty: boolean
}

type StyledStarProps = PropTypes & {
  size: 'tiny' | 'small' | 'normal' | 'large'
}

export const Star = ({ isLast, isEmpty, ...rest }: PropTypes) => {
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