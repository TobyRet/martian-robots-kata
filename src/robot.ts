import { CompassPosition, Move, NumericalPosition, Position } from './types'

export const finalPosition = (instructions: string) => {
  const instructionsArray = instructions.split('\n')
  const boundary = calculateBoundary(instructionsArray[0])
  let position: Position = {
    x: 0,
    y: 0,
    d: 1
  }
  let movements: string[] = []

  if (instructionsArray.length === 3) {
    position = determineStartingPosition(instructionsArray[1])
    movements = instructionsArray[2].split('')
  }

  let lost = false

  for(const move of movements) {
    if (move === Move.RIGHT) {
      position.d === 4 ? position.d = 1 : position.d++
    }

    if (move === Move.LEFT) {
      position.d === 1 ? position.d = 4 : position.d--
    }

    if (move === Move.FORWARD) {
      const intendedPosition = determineNewCoordinates(position)

      if (outOfBounds(intendedPosition, boundary)) {
        lost = true
        break
      } else {
        position = intendedPosition
      }
    }
  }

  return lost ? 'LOST' : `${position.x} ${position.y} ${mapToCompassPosition(position.d)}`
}

const outOfBounds = (intendedPosition: Position, boundary: { x: number, y: number }) => {
  return (intendedPosition.x < 0) || (intendedPosition.x > boundary.x) ||
    (intendedPosition.y < 0) || (intendedPosition.y > boundary.y)
}

const determineNewCoordinates = (position: Position): Position => {
  switch (position.d) {
    case 1:
      return {
        d: position.d,
        x: position.x,
        y: position.y + 1
      }
    case 2:
      return {
        d: position.d,
        x: position.x + 1,
        y: position.y
      }
    case 3:
      return {
        d: position.d,
        x: position.x,
        y: position.y - 1
      }
    case 4:
      return {
        d: position.d,
        x: position.x - 1,
        y: position.y
      }
    default:
      throw new Error('Robot has been moved to invalid position')
  }
}

const determineStartingPosition = (startingPositionString: string) => {
  const x = parseInt(startingPositionString.split(' ')[0])
  const y = parseInt(startingPositionString.split(' ')[1])
  const directionCompassPosition = startingPositionString.split(' ')[2] as CompassPosition
  const d = mapToNumericalPosition(directionCompassPosition)

  return {
    x,
    y,
    d
  }
}

const mapToCompassPosition = (numericalPosition: NumericalPosition): CompassPosition => {
  switch (numericalPosition) {
    case 1:
      return CompassPosition.NORTH
    case 2:
      return CompassPosition.EAST
    case 3:
      return CompassPosition.SOUTH
    case 4:
      return CompassPosition.WEST
  }
}

const mapToNumericalPosition = (compassPosition: CompassPosition): NumericalPosition => {
  switch (compassPosition) {
    case 'N':
      return 1
    case 'E':
      return 2
    case 'S':
      return 3
    case 'W':
      return 4
    default:
      throw new Error('Unknown compass position')
  }
}

const calculateBoundary = (coordinatesString: string) => {
  const [x, y] = coordinatesString.split(' ')

  return {
    x: parseInt(x),
    y: parseInt(y)
  }
}