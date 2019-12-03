// const fs: any = require('fs');
import * as fs from 'fs';
import csv from 'csv-parser';
import { mapValues } from './helpers/mapCsvImport';
import { Person, State, Gender } from './helpers/types';

const CURRENT_FOLDER: string = __dirname;

interface ValueCounts {
  [key: string]: number
}

const getMostCommonValue = (counts: ValueCounts): string|Gender|State => {
  const mostCommon = Object.keys(counts).reduce((valueA: string|Gender|State, valueB: string|Gender|State): string|Gender|State => {
    if (counts[valueA] > counts[valueB]) {
      return valueA;
    } else {
      return valueB
    }
  }, '')
  return mostCommon
}

const processResponders = (people: any): void => {
  let ageSum: number = 0;
  let hasPetsSum: number = 0; // we'll let true = 1, false = 0 and find the average.
  let states: ValueCounts = {};
  let firstNames: ValueCounts = {};
  let genders: ValueCounts = {};

  people.forEach((
    { age, hasPets, stateOfResidence, firstName, gender }: Person
  ) => {
    ageSum = ageSum + age;
    hasPetsSum = hasPetsSum + (hasPets ? 1 : 0);
    states[stateOfResidence] = (states[stateOfResidence] || 0) + 1;
    genders[gender] = (genders[gender] || 0) + 1;
    firstNames[firstName] = (firstNames[firstName] || 0) + 1;
  })

  const avgFirstName: string = getMostCommonValue(firstNames);
  const avgAge: number = ageSum / people.length;
  const avgHasPets: boolean = (hasPetsSum / people.length > 0.5) ? true : false;
  const avgGender: string = getMostCommonValue(genders);
  const avgState: string = getMostCommonValue(states);

  const averagePersonStr = `
  The average person is:
  - called ${avgFirstName},
  - ${avgAge} years old,
  - ${avgHasPets ? 'hasPets' : 'does not have pets'},
  - is ${avgGender},
  - and lives in ${avgState}
  `
  console.log(averagePersonStr);

}

const getAverages = async () : Promise<void> => {
  const responses: Person[] = [];
  fs.createReadStream(`${CURRENT_FOLDER}/../census.csv`)
  .pipe(csv({ mapValues }))
  .on('data', (data) => responses.push(data))
  .on('end', () => processResponders(responses));
}
getAverages();
