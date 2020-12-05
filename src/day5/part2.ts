import inputData from './input';
import { strToBin } from './part1';

function part2() {
  const boardingPasses = inputData.split('\n');
  const seatIds: number[] = [];

  boardingPasses.forEach((boardingPass) => {
    seatIds.push(strToBin(boardingPass));
  });

  const sortedSeats = seatIds.sort((a, b) => a - b);

  sortedSeats.map((seat, index) => {
    if (index > 0 && index < sortedSeats.length) {
      if (seat - sortedSeats[index - 1] !== 1) {
        console.log(`Empty seat is: ${seat - 1}`)
      }
    }
  })
}

part2();
