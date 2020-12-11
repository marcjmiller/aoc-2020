import {
  test1Data,
  test1Solution,
  test1Part2Solution,
  test2Data,
  test2Solution,
  test2Part2Solution,
  liveData,
} from './input';

function grokInput(data: string) {
  const adapters: number[] = data
    .split('\n')
    .map((adapter) => parseInt(adapter))
    .sort((a, b) => a - b);
  return [0, ...adapters];
}

function parseAdapters(adapters: number[]) {
  let countOnes = 0;
  let countThrees = 1;
  let lastAdapter = 0;

  // adapters = [1, 2, 4]

  for (let adapter of adapters) {
    // adapter = 4, lastAdapter = 2
    if (adapter - lastAdapter === 1) {
      countOnes++;
    } else if (adapter - lastAdapter === 3) {
      countThrees++;
    }

    // lastAdapter = 2
    lastAdapter = adapter;
  }

  return countOnes * countThrees;
}

function countArrangements(adapters: number[]) {
  let paths = [1, ...Array(Math.max(...adapters)).fill(0)];

  for (let i of adapters) {
    for (let j of [1, 2, 3]) {
      if (adapters.includes(i - j)) {
        paths[i] = paths[i] + paths[i - j];
      }
    }
  }
  return paths[paths.length - 1];
}

function main(data: string, expectedValue?: number, part2?: boolean) {
  const adapters = grokInput(data);
  let calculatedValue = -1;

  if (!part2) {
    calculatedValue = parseAdapters(adapters);
  } else {
    calculatedValue = countArrangements(adapters);
  }

  if (expectedValue) {
    console.log(
      `Expected ${expectedValue}, Calculated ${calculatedValue}: ${
        calculatedValue === expectedValue ? '\u2713 PASS' : '\u2716 FAIL'
      }\n`
    );
  } else {
    console.log(`Calculated value: ${calculatedValue}\n`);
  }
}

console.log('---- Part 1 Test 1 ----');
main(test1Data, test1Solution);

console.log('---- Part 1 Test 2 ----');
main(test2Data, test2Solution);

console.log('---- Part 1 Live ----');
main(liveData);

console.log('---- Part 2 Test 1 ----');
main(test1Data, test1Part2Solution, true);

console.log('---- Part 2 Test 2 ----');
main(test2Data, test2Part2Solution, true);

console.log('---- Part 2 Live ----');
main(liveData, undefined, true);
