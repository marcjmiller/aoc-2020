import {inputData, testData} from './input';

function part1(data: string) {
  let totalUniqueAnswers = 0;
  const groups = data.split('\n\n');
  // console.log(groups.length, 'groups:', groups);
  groups.forEach(testGroup => {
    const person = testGroup.split('\n');
    const uniqueAnswers = new Set();
    person.forEach(answers => {
      answers.split('').map(answer => uniqueAnswers.add(answer))
    });
    // console.log(uniqueAnswers.size, 'uniqueAnswers:', uniqueAnswers)
    totalUniqueAnswers+= uniqueAnswers.size;
  })
  console.log(totalUniqueAnswers, 'totalUniqueAnswers')
  return totalUniqueAnswers
}
part1(testData);
part1(inputData);
