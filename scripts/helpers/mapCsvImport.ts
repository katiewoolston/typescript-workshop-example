import { State } from './types';

export const mapValues = ({ header, value }: { header: string; value: string }): State|number|boolean|string => {
  switch(header) {
    case 'stateOfResidence':
      return State[value.toUpperCase() as keyof typeof State];  // enumerable
    case 'age':
      return parseInt(value); // number
    case 'hasPets':
      return value.toUpperCase() === 'TRUE'; // boolean
    default:
      return value; // string
  }
}
