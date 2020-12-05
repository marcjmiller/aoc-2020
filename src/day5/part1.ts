import inputData from './input';
const seatIds: number[] = [];

function translateToBinStr(inChr: string) {
  switch (inChr) {
    case 'F':
      return '0';

    case 'L':
      return '0';

    default:
      return '1';
  }
}

export function strToBin(inStr: string) {
  let outBin: string = '';
  
  for (let chr of inStr) {
    outBin = outBin + translateToBinStr(chr);
  }

  return parseInt(outBin, 2);
}

function getSeats(inputData: string) {
  const boardingPasses = inputData.split('\n');

  boardingPasses.forEach((boardingPass) => {
    const row = strToBin(boardingPass.slice(0, 7)); // first 7 characters represent the row
    const col = strToBin(boardingPass.slice(7)); // last 3 characters represent the col
    const seatId = (row * 8) + col; // seat is (row * 8) + col, or just the full string to binary
    
    // console.log(boardingPass, row, boardingPass.slice(0, 7), col, boardingPass.slice(7), seatId);
    // console.log(`row: ${row}, col: ${col}, seatId: ${seatId}`);
    seatIds.push(seatId);
  });

  return seatIds;
}

// console.log(`${strToBin('FBFBBFFRLR')} should be 357`);
// console.log(`${strToBin('BFFFBBFRRR')} should be 567`);
// console.log(`${strToBin('FFFBBBFRRR')} should be 119`);
// console.log(`${strToBin('BBFFBBFRLL')} should be 820`);
function part1() {
  getSeats(inputData);
  return console.log(`Highest seatId in ${seatIds.length} seats: ${Math.max(...seatIds)}`);
}

part1();
