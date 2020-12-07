import { testDataPart1, testDataPart2, inputData } from './input';

function splitInputIntoRulesMap(data: string) {
  const rulesAsStr = data.split('\n');
  const rulesMap = new Map<string, string[]>();

  rulesAsStr.forEach((rule) => {
    const split = rule.split(' contain ');
    const bagName = split[0].replace(' bags', '');
    const contents = split[1].replace(/([0-9]\s| bags| bag|no other)\.?/g, '').split(', ');

    rulesMap.set(bagName, contents);
  });

  rulesMap.forEach((contents, bagName) => {
    let newContents = new Set(contents);

    newContents.forEach((bagName) => {
      let bagContents = rulesMap.get(bagName) || [];
      bagContents.map((bag) => {
        if (bag !== '') {
          newContents.add(bag);
        }
      });
    });
    rulesMap.set(bagName, Array.from(newContents));
  });

  return rulesMap;
}

function getBags(data: string) {
  let bags: string[][] = [];
  data.split('.\n').map((line) => {
    bags.push(line.match(/^(?:\w+\s\w+)|([0-9] \w+\s\w+)/g) || []);
  });
  return bags;
}

function part1(data: string) {
  const rules = splitInputIntoRulesMap(data);
  let count = 0;
  rules.forEach((bagsList) => {
    if (bagsList.includes('shiny gold')) {
      count++;
    }
  });
  return count;
}

// TODO: Finish part2 when able.
function part2(data: string) {
  let countChildren = 0;
  const bags = getBags(data);

  console.log(bags);

  return countChildren;
}

// const testDataCountPart1 = part1(testDataPart1);
// console.log(`Test data part 1: ${testDataCountPart1 === 4 ? 'PASS' : 'FAIL'}\n`);

// const liveDataCountPart1 = part1(inputData);
// console.log(`Live data count is: ${liveDataCountPart1}\n`);

const testDataCountPart2Ex1 = part2(testDataPart1);
console.log(`Test data part 2: ${testDataCountPart2Ex1} === 32 ? 'PASS' : 'FAIL'\n`);

const testDataCountPart2Ex2 = part2(testDataPart2);
console.log(`Test data part 2: ${testDataCountPart2Ex2} === 126 ? 'PASS' : 'FAIL'\n`);
