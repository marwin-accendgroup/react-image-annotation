/*
  This Function Return previous x and y coordinate for Line Selector and Arrow Selector
  This is Used For Content and Editor
*/
export function getPreviousX(points) {
 
  return points.reduce((prev) => (prev.x))
}

export function getPreviousY(points) {
  
  return points.reduce((prev) => (prev.y))
}