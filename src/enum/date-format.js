import Enum from './enum.js';

export default class DateFormat extends Enum {
  static DATE = 'DD/MM/YY';
  static TIME = 'HH:mm';
  static CALENDAR_DATE = 'MMM D';
}
