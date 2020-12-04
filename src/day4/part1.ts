import inputData from './input';

let validPassports = 0;

inputData.forEach((passport) => {
  if (passport.split(' ').length >= 8) {
    console.log(passport);
    validPassports++;
  } else if (passport.split(' ').length === 7) {
    passport.indexOf('cid') === -1 && validPassports++ && console.log(passport);
  }
});

console.log(validPassports);
