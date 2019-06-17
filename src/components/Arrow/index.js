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
const ArrowHeadUp = styled.div`
  position: absolute;
  transform: translate3d(-50%, -50%, 0);
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 10px 20px 10px;
  border-color: transparent transparent #000000 transparent;
}
`
const ArrowHeadDown = styled.div`
  position: absolute;
  transform: translate3d(-50%, -50%, 0);
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 20px 10px 0 10px;
  border-color: #000000 transparent transparent transparent;
}
`
const ArrowHeadRight = styled.div`
  position: absolute;
  transform: translate3d(-50%, -50%, 0);
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 10px 0 10px 20px;
  border-color: transparent transparent transparent #000000;

}
`
const ArrowHeadLeft = styled.div`
  position: absolute;
  transform: translate3d(-50%, -50%, 0);
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 10px 20px 10px 0;
  border-color: transparent #000000 transparent transparent;
}
`
const ArrowTopLeft = styled.div`
  position: absolute;
  transform: translate3d(-50%, -50%, 0);
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 15px 15px 0 0;
  border-color: #000000 transparent transparent transparent;
}
`
const ArrowTopRight = styled.div`
  position: absolute;
  transform: translate3d(-50%, -50%, 0);
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 15px 15px 0;
  border-color: transparent #000000 transparent transparent;
}
`
const ArrowBottomLeft = styled.div`
  position: absolute;
  transform: translate3d(-50%, -50%, 0);
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 15px 0 0 15px;
  border-color: transparent transparent transparent #000000;
}
`
const ArrowBottomRight = styled.div`
  position: absolute;
  transform: translate3d(-50%, -50%, 0);
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 0 15px 15px;
  border-color: transparent transparent #000000 transparent;

}
`

const Container = styled.div`
  box-shadow: 0px 0px 1px 1px white inset;
  box-sizing: border-box;
  transition: box-shadow 0.21s ease-in-out;
`

function Arrow (props) {
  const { geometry } = props.annotation
  if (!geometry || !geometry.points || geometry.points.length === 0) return null

  let prevItem

  return (
    <Container
      className={`linesContainer ${props.className}`}
      style={{
        width: '100%',
        height: '100%',
        ...props.style
      }}
    >
      {(geometry.points.length == 2) && geometry.points.map((item,i) => {
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
        
        if (i === 0) { 
          prevItem = geometry.points[geometry.points.length - 1]
        } 
        else{
          prevItem = geometry.points[i - 1]
        }
        
        if(i===0){
          return (
            <PointDot
              key={i + "_" + item.x + "_" + item.y}
              style={{
                left: item.x + "% ",
                top: item.y + "%"
              }}
            />
          )
        }
        else{
          if((Math.floor(item.x/10)*10) === (Math.floor(prevItem.x/10)*10) && (Math.ceil(item.x/10)*10) === (Math.ceil(prevItem.x/10)*10)){
            if((Math.floor(item.y/10)*10) > (Math.floor(prevItem.y/10)*10) && (Math.ceil(item.y/10)*10) > (Math.ceil(prevItem.y/10)*10)){
              return(
                <ArrowHeadDown
                key={i + "_" + item.x + "_" + item.y}
                style={{
                  left: item.x + "% ",
                  top: item.y + "%"
                }}
                />
              )
            }
            else if((Math.floor(item.y/10)*10) < (Math.floor(prevItem.y/10)*10) && (Math.ceil(item.y/10)*10) < (Math.ceil(prevItem.y/10)*10)){
              return (
                <ArrowHeadUp
                key={i + "_" + item.x + "_" + item.y}
                style={{
                  left: item.x + "% ",
                  top: item.y + "%"
                }}
                />
              )
            }
          }
          else if(item.x > prevItem.x)
          {
            if((Math.floor(item.y/10)*10) === (Math.floor(prevItem.y/10)*10) && (Math.ceil(item.y/10)*10) === (Math.ceil(prevItem.y/10)*10)){
              return (
                <ArrowHeadRight
                key={i + "_" + item.x + "_" + item.y}
                style={{
                  left: item.x + "% ",
                  top: item.y + "%"
                }}
                />
              )
            }
            if(item.y < prevItem.y){
              return (
                <ArrowTopRight
                key={i + "_" + item.x + "_" + item.y}
                style={{
                  left: item.x + "% ",
                  top: item.y + "%"
                }}
                />
              )
            }
            if(item.y > prevItem.y){
              return(
                <ArrowBottomRight
                key={i + "_" + item.x + "_" + item.y}
                style={{
                  left: item.x + "% ",
                  top: item.y + "%"
                }}
                />
              )
            }
            
          }
          else if(item.x < prevItem.x){

            if((Math.floor(item.y/10)*10) === (Math.floor(prevItem.y/10)*10) && (Math.ceil(item.y/10)*10) === (Math.ceil(prevItem.y/10)*10)){
              return (
                <ArrowHeadLeft
                key={i + "_" + item.x + "_" + item.y}
                style={{
                  left: item.x + "% ",
                  top: item.y + "%"
                }}
                />
              )
            }
            if(item.y > prevItem.y){
              return (
                <ArrowBottomLeft
                key={i + "_" + item.x + "_" + item.y}
                style={{
                  left: item.x + "% ",
                  top: item.y + "%"
                }}
                />
              )
            }
            if(item.y < prevItem.y){
              return(
                <ArrowTopLeft
                key={i + "_" + item.x + "_" + item.y}
                style={{
                  left: item.x + "% ",
                  top: item.y + "%"
                }}
                />
              )
            }
          }
        }
      })}
    </Container>
  )
}

Arrow.defaultProps = {
  className: '',
  style: {}
}

export default Arrow