import Enum from './enum.js';

export default class SortPredicate extends Enum {
  static DAY = (point, nextPoint) =>
    Date.parse(point.startDate) - Date.parse(nextPoint.startDate);

  static PRICE = (point, nextPoint) => nextPoint.basePrice - point.basePrice;

  static DEFAULT = this.DAY;
}
