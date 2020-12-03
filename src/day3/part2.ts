import inputData from './input';

const TREE = '#';

const inputWidth = inputData[0].length;
const slopes = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2],
];

let treesHit = 0;
let currCol = 0;
let slopeTrees: number[] = [];

slopes.forEach((slope) => {
  let colInc = slope[0];
  let rowInc = slope[1];
  currCol = 0;
  treesHit = 0;

  for (let currRow = 0; currRow < inputData.length; currRow += rowInc) {
    if (inputData[currRow][currCol] === TREE) {
      // console.log(`Tree found at (${currRow}, ${currCol}) on slope ${slope}`);
      treesHit++;
    }
    currCol = (currCol + colInc) % inputWidth;
  }

  // console.log(`${treesHit} trees hit for slope ${slope}`);
  slopeTrees.push(treesHit);
});

// console.log(slopeTrees);
console.log(`Total: ${slopeTrees.reduce((val1, val2) => val1 * val2)}`);
