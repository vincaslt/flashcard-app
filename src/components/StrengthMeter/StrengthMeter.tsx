import * as React from 'react'
import Star from './Star'

interface Props {
  value: number
  max: number
}

const StrengthMeter = ({ value, max }: Props) => {
  const meter = Array(max).fill(0).map((_, i) => (
    <Star key={i} isEmpty={i >= value} isLast={i >= (max - 1)} size="small" />
  ))
  return <div>{meter}</div>
}

export default StrengthMeter