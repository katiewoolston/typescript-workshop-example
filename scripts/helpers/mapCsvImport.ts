import { State } from './types';

export const mapValues = ({ header, value }: { header: string; value: string }): State|number|string => {
  switch(header) {
    case 'stateOfResidence':
      return State[value.toUpperCase() as keyof typeof State];  // enumerable
    case 'age':
      return parseInt(value); // number
    default:
      return value; // string
  }
}
