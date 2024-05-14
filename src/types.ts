export type NumericalPosition = 1 | 2 | 3 | 4

export enum CompassPosition {
  NORTH = 'N',
  SOUTH = 'S',
  EAST = 'E',
  WEST = 'W'
}
export interface Position {
  x: number,
  y: number,
  d: NumericalPosition
}

export enum Move {
  LEFT = 'L',
  RIGHT = 'R',
  FORWARD = 'F'
}
