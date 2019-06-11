import React from 'react'
import styled from 'styled-components'
import { LineSelector, ArrowSelector } from '../../selectors'

const Container = styled.div`
  background: white;
  border-radius: 2px;
  box-shadow:
    0px 1px 5px 0px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14),
    0px 3px 1px -2px rgba(0, 0, 0, 0.12);
  padding: 8px 16px;
  margin-top: 8px;
  margin-left: -50%;
  margin-right: 50%;
`

function Content (props) {
  const { geometry } = props.annotation
  if (!geometry) return null
  return (
    <div
      style={{
        position: 'absolute',
        left: ((geometry.type === LineSelector.TYPE || geometry.type === ArrowSelector.TYPE) ? `${geometry.points.reduce((prev) => (prev.x))}%` : `${geometry.x}%`),
        top: ((geometry.type === LineSelector.TYPE || geometry.type === ArrowSelector.TYPE) ? `${geometry.points.reduce((prev) => (prev.y))}%` : `${geometry.y + geometry.height}%`),
        zIndex: 10,
        ...props.style
      }}
      className={props.className}
      geometry={geometry}
    >
      <Container
        style={{
          color: '#FF0000',
          fontSize: '15px',
          padding: '5px 10px'
        }}
      >
        {props.annotation.data && props.annotation.data.text}
      </Container>
    </div>
  )
} 

Content.defaultProps = {
  style: {},
  className: ''
}

export default Content