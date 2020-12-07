import { testData, inputData } from './input';

function splitInputIntoRules(data: string) {
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

function main(data: string) {
  const rules = splitInputIntoRules(data);
  let count = 0;
  rules.forEach((bagsList) => {
    if (bagsList.includes('shiny gold')) {
      count++;
    }
  });
  return count;
}

const testDataCount = main(testData);
console.log(`Test data count should be 4: ${testDataCount === 4 ? 'PASS' : 'FAIL'}`);

const liveDataCount = main(inputData);
console.log(`Live data count is: ${liveDataCount}`);
