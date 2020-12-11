import {
  liveData,
  testData,
  testDataOccupied,
  testDataRound1,
  testDataRound2,
  testDataRound3,
  testDataRound4,
  testDataRound5,
} from './input';

const SEAT = {
  EMPTY: 'L',
  FILLED: '#',
  FLOOR: '.',
};

function grokInput(data: string) {
  return data.split('\n').map((line) => line.split(''));
}

function getNeighbors(data: string[][], row: number, col: number) {
  const startRow = row > 0 ? row - 1 : 0;
  const startCol = col > 0 ? col - 1 : 0;
  return data.slice(startRow, row + 2).map((i) => i.slice(startCol, col + 2));
}

function countNeighbors(data: string[][], row: number, col: number) {
  if (data[row][col] === SEAT.FLOOR) {
    return;
  } else {
    const neighborSeats = getNeighbors(data, row, col);
    let neighborCount = 0;

    for (let row of neighborSeats) {
      for (let seat of row) {
        if (seat === SEAT.FILLED) {
          neighborCount++;
        }
      }
    }

    if (data[row][col] === SEAT.FILLED) {
      neighborCount--;
    }

    return neighborCount;
  }
}

function getNeighborMap(data: string[][]) {
  const output = data.map((line) => Array(line.length).fill(0));

  for (let row in data) {
    for (let col in data[row]) {
      output[row][col] = countNeighbors(data, +row, +col);
    }
  }

  return output;
}

function getNextSeats(data: string[][]) {
  const neighbors = getNeighborMap(data);
  let nextData = Array.from(data);

  for (let row in data) {
    for (let seat in data[row]) {
      if (data[row][seat] === SEAT.FLOOR) {
        continue;
      } else if (neighbors[row][seat] === 0) {
        nextData[row][seat] = SEAT.FILLED;
      } else if (neighbors[row][seat] >= 4) {
        nextData[row][seat] = SEAT.EMPTY;
      }
    }
  }

  return nextData;
}

function main(data: string, iterations: number = 0) {
  const input = grokInput(data);
  let lastData = Array.from(input);
  let nextData: string[][] = getNextSeats(input);//getNextSeats(input);
  let count = 1;

  while (iterations === 0 || count < iterations) {
    nextData = getNextSeats(lastData);

    if (iterations === 0 && lastData.toString() === getNextSeats(lastData).toString()) {
      // lastData.map((_, i) => console.log(lastData[i].join(''), ' ', nextData[i].join('')));
      // console.log(`last data / next data match after ${count} iterations`)
      break;
    } else {
      count++;
      lastData = Array.from(nextData);
    }

  }

  return nextData;
}

function countFilledSeats(data: string[][]) {
  let countSeatsFilled = 0;
  data.map((line) =>
    line.map((seat) => {
      if (seat === SEAT.FILLED) countSeatsFilled++;
    })
  );

  return countSeatsFilled;
}

function testImp(data: string, testExpect: string | number, iterations?: number) {
  const result = main(data, iterations && iterations);

  if (typeof testExpect === 'string') {
    const expect = grokInput(testExpect);
    console.log(`Result matches expect ? ${expect.toString() === result.toString() ? 'PASS' : 'FAIL'}`);
    console.log(`Filled seats: ${countFilledSeats(result)}\n`);
    if (expect.toString() !== result.toString()) {
      console.log('  RESULT   -   EXPECT  ');
      result.map((_, index) => console.log(result[index].join(''), ' ', expect[index].join('')));
    }
  } else {
    const count = countFilledSeats(result);
    console.log(`${count} filled seats matches ${testExpect} ? ${count === testExpect ? 'PASS' : 'FAIL'}\n`);
  }
}

console.log(`----- test1 -----`);
testImp(testData, testDataOccupied, 0);

console.log(`----- test2 -----`);
testImp(testData, testDataRound1, 1);

console.log(`----- test3 -----`);
testImp(testData, testDataRound2, 2);

console.log(`----- test4 -----`);
testImp(testData, testDataRound3, 3);

console.log(`----- test5 -----`);
testImp(testData, testDataRound4, 4);

console.log(`----- test6 -----`);
testImp(testData, testDataRound5, 5);

console.log(`----- LIVE -----`);
const result = main(liveData);
console.log(`${countFilledSeats(result)} filled seats.`);
