export enum State {
  QLD = 'Queensland',
  NSW = 'New South Wales',
  SA = 'South Australia',
  WA = 'Western Australia',
  NT = 'Northern Territory',
  VIC = 'Victoria',
  TAS = 'Tasmania',
  ACT = 'Australian Capital Territory',
}

export interface Person {
  firstName: string;
  lastName: string;
  countryOfOrigin: string;
  primaryLanguage: string;
  title: string;
}
