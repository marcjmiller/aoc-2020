import {
  testData,
  testDataOccupied,
  testDataRound1,
  testDataRound2,
  testDataRound3,
  testDataRound4,
  testDataRound5,
} from './input';

function grokInput(data: string) {
  return data.split('\n').map((line) => line.split(''));
}

function getNeighbors(data: string[][], row: number, col: number) {
  const startRow = row > 0 ? row - 1 : 0;
  const startCol = col > 0 ? col - 1 : 0;
  return data.slice(startRow, row + 2).map((i) => i.slice(startCol, col + 2));
}

function calcNeighbors(data: string[][], row: number, col: number) {
  if (data[row][col] === '.') {
    return -1;
  } else {
    const neighborSeats = getNeighbors(data, row, col);
    let neighbors = 0;

    for (let row of neighborSeats) {
      for (let seat of row) {
        if (seat === '#') {
          neighbors++;
        }
      }
    }

    return neighbors;
  }
}

function getNeighborMap(data: string[][]) {
  const output = data.map((line) => Array(line.length).fill(0));

  for (let row in data) {
    for (let col in data[row]) {
      output[row][col] = calcNeighbors(data, +row, +col);
    }
  }

  return output;
}

function main(data: string, iterations?: number) {
  const initData = grokInput(data);
  let newData = Array.from(initData);
  
  if (!iterations) {
    iterations = 1;
  }
  
  let count = 0;
  
  while (count < iterations) {
    const neighbors = getNeighborMap(newData);
    for (let row in newData) {
      for (let seat in newData[row]) {
        if (newData[row][seat] === '.') {
          continue;
        } else if (newData[row][seat] === 'L') {
          if (neighbors[row][seat] === 0) {
            newData[row][seat] = '#';
          }
        } else if (newData[row][seat] === '#') {
          if (neighbors[row][seat] >= 4) {
            newData[row][seat] = 'L';
          }
        }
      }
    }
    count++;
  }

  return newData;
}

function testImp(data: string, testExpect: string | number, iterations?: number) {
  const result = main(data, iterations);
  if (typeof testExpect === 'string') {
    const expect = grokInput(testExpect);
    console.log(`Result matches expect ? ${expect.toString() === result.toString() ? 'PASS' : 'FAIL'}\n`);
    if (expect.toString() !== result.toString()) {
      console.log(result)
    }
  }
}

// console.log(`----- test1 -----`);
// testImp(testData, testDataOccupied);

console.log(`----- test2 -----`);
testImp(testData, testDataRound1, 1);

console.log(`----- test3 -----`);
testImp(testData, testDataRound2, 2);

// console.log(`----- test4 -----`);
// testImp(testData, testDataRound3, 3);

// console.log(`----- test5 -----`);
// testImp(testData, testDataRound4, 4);

// console.log(`----- test6 -----`);
// testImp(testData, testDataRound5, 5);
