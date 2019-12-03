// const fs: any = require('fs');
import * as fs from 'fs';
import csv from 'csv-parser';
import { mapValues } from './helpers/mapCsvImport';
import { Person } from './helpers/types';

const CURRENT_FOLDER: string = __dirname;

const processResponders = (people: Person[]): void => {
  console.log(`
    Census data:
    ${JSON.stringify(people)}
    The average person is unknown.
  `);
}

const getAverages = async (): Promise<void> => {
  const responses: Person[] = [];
  fs.createReadStream(`${CURRENT_FOLDER}/../census.csv`)
    .pipe(csv({ mapValues }))
    .on('data', (data) => responses.push(data))
    .on('end', () => processResponders(responses));
}
getAverages();
