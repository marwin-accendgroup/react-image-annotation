const getCoordPercentage = (e) => ({
  x: e.nativeEvent.offsetX / e.currentTarget.offsetWidth * 100,
  y: e.nativeEvent.offsetY / e.currentTarget.offsetHeight * 100
})

export const TYPE = 'LINE'

export function intersects ({ x, y }, geometry) {
  return 0
}

export function area (geometry) {
  return 0
}

export const methods = {

  onMouseDown(annotation, e) {
    if (!annotation.selection) {
      const coordOfClick = getCoordPercentage(e)
      
      return {
        ...annotation,
        geometry: {
          ...annotation.geometry,
          type: TYPE,
          points: (!annotation.geometry ? [coordOfClick] : [
            ...annotation.geometry.points,
            coordOfClick
          ])
        },
        selection: {
          ...annotation.selection,
          mode: 'SELECTING'
        }
      }
    }else{
      return {}
    }
  },
  onMouseUp (annotation, e) {
    const coordOfClick = getCoordPercentage(e)
    if (annotation.selection) {
      const { selection, geometry } = annotation

      if (!geometry) {
        return {}
      }

      switch (annotation.selection.mode) {
        case 'SELECTING':
          return {
            ...annotation,
            geometry: {
              ...annotation.geometry,
              type: TYPE,
              points: (!annotation.geometry ? [coordOfClick] : [
                ...annotation.geometry.points,
                coordOfClick
              ])
            },
            selection: {
              ...annotation.selection,
              showEditor: true,
              mode: 'EDITING'
            }
          }
        default:
          break
      }
    }

    return annotation
  },
}

export default {
  TYPE,
  intersects,
  area,
  methods
}