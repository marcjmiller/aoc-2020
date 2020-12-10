import { test1Data, test1Solution, test2Data, test2Solution, liveData } from './input';

function grokInput(data: string) {
  const adapters: number[] = data
    .split('\n')
    .map((adapter) => parseInt(adapter))
    .sort((a, b) => a - b);
  console.log(`sorted adapters: ${adapters}`);
  return adapters;
}

function parseAdapters(adapters: number[]) {
  let countOnes = 0;
  let countThrees = 1;
  let lastAdapter = 0;

  for (let adapter of adapters) {
    if (adapter - lastAdapter === 1) {
      countOnes++;
    } else if (adapter - lastAdapter === 3) {
      countThrees++;
    }
    lastAdapter = adapter;
  }

  return countOnes * countThrees;
}

function main(data: string, expectedValue?: number) {
  const adapters = grokInput(data);

  const calculatedValue = parseAdapters(adapters);

  if (expectedValue) {
    console.log(
      `Expected ${expectedValue}, Calculated ${calculatedValue}: ${
        calculatedValue === expectedValue ? '\u2713 PASS' : '\u2716 FAIL'
      }\n`
    );
  } else {
    console.log(`Calculated value: ${calculatedValue}`);
  }
}

console.log('---- Test1 ----');
main(test1Data, test1Solution);

console.log('---- Test2 ----');
main(test2Data, test2Solution);

console.log('---- Live ----');
main(liveData);
