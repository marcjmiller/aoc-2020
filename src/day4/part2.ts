import inputData from './input';

let validPassports = 0;

const byrRegex = /byr:([0-9]{4})/i;
const iyrRegex = /iyr:([0-9]{4})/i;
const eyrRegex = /eyr:([0-9]{4})/i;
const hgtRegex = /hgt:([0-9]{2,3}(?:cm|in))/i;
const hclRegex = /hcl:(#[0-9a-f]{6})/i;
const eclRegex = /ecl:(amb|blu|brn|gry|grn|hzl|oth)/i;
const pidRegex = /pid:([0-9]{9})\b/i;

function valueBetween(val: number, min: number, max: number) {
  return min <= val && val <= max;
}

function validByr(byr: number) {
  return valueBetween(byr, 1920, 2002);
}

function validIyr(iyr: number) {
  return valueBetween(iyr, 2010, 2020);
}

function validEyr(eyr: number) {
  return valueBetween(eyr, 2020, 2030);
}

function validHgt(hgt: string) {
  if (hgt?.indexOf('cm') !== -1) {
    return 150 <= +hgt.substring(0, hgt.length - 2) && +hgt.substring(0, hgt.length - 2) <= 193;
  } else if (hgt?.indexOf('in') !== -1) {
    return 59 <= +hgt.substring(0, hgt.length - 2) && +hgt.substring(0, hgt.length - 2) <= 76;
  }
  return false;
}

function grokPassport(passport: string) {
  const byr = +byrRegex.exec(passport)!?.[1];
  const iyr = +iyrRegex.exec(passport)!?.[1];
  const eyr = +eyrRegex.exec(passport)!?.[1];
  const hgt = hgtRegex.exec(passport)!?.[1];
  const hcl = hclRegex.exec(passport)!?.[1];
  const ecl = eclRegex.exec(passport)!?.[1];
  const pid = pidRegex.exec(passport)!?.[1];

  return { byr, iyr, eyr, hgt, hcl, ecl, pid };
}

function checkValid(passport: string) {
  const { byr, iyr, eyr, hgt, hcl, ecl, pid } = grokPassport(passport);

  if (!byr || !iyr || !eyr || !hgt || !hcl || !ecl || !pid) {
    return false;
  }

  if (!validByr(byr) || !validIyr(iyr) || !validEyr(eyr) || !validHgt(hgt)) {
    return false;
  }

  return true;
}

inputData.forEach((passport) => {
  const passportLength = passport.split(' ').length;

  if (passportLength >= 7) {
    if (checkValid(passport)) {
      validPassports++;
    }
  }
});

console.log(`Valid Passports: ${validPassports}`);
