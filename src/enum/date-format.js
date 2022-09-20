import Enum from './enum.js';

// TODO: переписать без перечисления
export default class DateFormat extends Enum {
  static DATE = 'DD/MM/YY';
  static TIME = 'HH:mm';
  static CALENDAR_DATE = 'MMM D';
  static DATE_TIME = 'd/m/y H:i';
}
