const getCoordPercentage = (e) => ({
  x: e.nativeEvent.offsetX / e.currentTarget.offsetWidth * 100,
  y: e.nativeEvent.offsetY / e.currentTarget.offsetHeight * 100
})

export const TYPE = 'ARROW'

export function intersects ({ x, y }, geometry) {
  if (!geometry || !geometry.points || geometry.points.lenght < 1 ) return false

  return geometry.points.map(point => [point.x, point.y])
}

export function area (geometry) {
  if (!geometry || !geometry.points || geometry.points.length < 1) return 0

  return geometry.points.map(point => [point.x, point.y])
}

export const methods = {

  onMouseDown(annotation, e) {
    if (!annotation.selection) {
      const coordinates = getCoordPercentage(e)
      
      return {
        ...annotation,
        geometry: {
          ...annotation.geometry,
          type: TYPE,
          points: (!annotation.geometry ? [coordinates] : [
            ...annotation.geometry.points,
            coordinates
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
    const coordinates = getCoordPercentage(e)

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
              points: (!annotation.geometry ? [coordinates] : [
                ...annotation.geometry.points,
                coordinates
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