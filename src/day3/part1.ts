import inputData from './input';

const TREE = '#';
const inputWidth = inputData[0].length;
let treesHit = 0;
let currCol = 0;

inputData.forEach((row: string) => {
  if (row[currCol] === TREE) {
    treesHit++;
  }
  currCol = (currCol + 3) % inputWidth;
});

console.log(treesHit);
