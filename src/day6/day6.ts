import { inputData, testData } from './input';

interface CommonAnswers {
  [key: string]: number;
}

function main(data: string, part2?: boolean) {
  let totalUniqueAnswers = 0;
  let peopleWithCommonAnswers = 0;
  const groups = data.split('\n\n');
  
  groups.forEach((group) => {
    const person = group.split('\n');
    const uniqueAnswers = new Set();
    const everyOneAnswers = [];
    let commonAnswers = new Map<string, number>();
    person.forEach((answers) => {
      answers.split('').map((answer) => {
        if (part2) {
          let newValue = commonAnswers.get(answer) || 0;
          newValue++;
          commonAnswers.set(answer, newValue);
        }
        uniqueAnswers.add(answer);
      });
    });

    if (part2) {
      commonAnswers.forEach((_, key) => {
        if (commonAnswers.get(key) === person.length) {
          peopleWithCommonAnswers++;
        }
      });
    }
    
    totalUniqueAnswers += uniqueAnswers.size;
  });
  
  if (!part2) {
    console.log(totalUniqueAnswers, 'totalUniqueAnswers');
    return totalUniqueAnswers;
  } else {
    console.log(peopleWithCommonAnswers, 'peopleWithCommonAnswers');
    return peopleWithCommonAnswers;
  }
}

console.log('Part 1, w/ TestData');
main(testData);
console.log('Part 1, w/ LiveData');
main(inputData);

console.log('Part 2, w/ TestData');
main(testData, true);
console.log('Part 2, w/ LiveData');
main(inputData, true);
