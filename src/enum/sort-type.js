import Enum from './enum.js';

export default class SortType extends Enum {
  static DAY = 'day';
  static EVENT = 'event';
  static TIME = 'time';
  static PRICE = 'price';
  static OFFER = 'offer';
}
