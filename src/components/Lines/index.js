import React from 'react'
import LineTo from 'react-lineto'
import styled from 'styled-components'

const PointDot = styled.div`
  background: #000000;
  border-radius: 1px;
  width: 2px;
  height: 2px;
  margin-left: -1px;
  margin-top: -1px;
  position: absolute;
`
const Container = styled.div`
  box-shadow: 0px 0px 1px 1px white inset;
  box-sizing: border-box;
  transition: box-shadow 0.21s ease-in-out;
`

function Lines (props) {
  const { geometry } = props.annotation
  if (!geometry || !geometry.points || geometry.points.length === 0) return null

  return (
    <Container
      className={`linesContainer ${props.className}`}
      style={{
        width: '100%',
        height: '100%',
        ...props.style
      }}
    >
      {(geometry.points.length == 2) && geometry.points.map((item,i) => { // Iterate over points to create the edge lines
        let prevItem
        if (i === 0) { 
          prevItem = geometry.points[geometry.points.length - 1]
        }
        else{
          prevItem = geometry.points[i - 1]
        }
        return (
           <LineTo
            key={i + "_" + item.x + "_" + item.y + "_" + prevItem.x + "_" + prevItem.y}
            from="linesContainer"
            fromAnchor={item.x + "% " + item.y + "%"}
            to="linesContainer"
            toAnchor={prevItem.x + "% " + prevItem.y + "%"}
            borderColor={'#000000'}
            borderStyle={'dashed'}
            borderWidth={2}
          />
        )
      })}
      {geometry.points.map((item,i) => {
        return (
          <PointDot
            key={i + "_" + item.x + "_" + item.y}
            style={{
              left: item.x + "% ",
              top: item.y + "%"
            }}
          />
        )
      })}
    </Container>
  )
}

Lines.defaultProps = {
  className: '',
  style: {}
}

export default Lines