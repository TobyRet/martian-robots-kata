import { finalPosition } from './robot'

describe('Robot final position', () => {
  it('returns the correct coordinates if the robot is still on the grid', () => {
    const instructions = "5 3\n1 1 E\nRFRFRFRF"
    const position = finalPosition(instructions)

    expect(position).toEqual('1 1 E')
  })

  it('returns LOST if the robot goes off the grid', () => {
    const instructions = "1 1\n1 1 N\nF"
    const position = finalPosition(instructions)

    expect(position).toEqual('LOST')
  })

  it('returns the final edge coordinates if a another robot has previously been LOST at that location', () => {

  })
})