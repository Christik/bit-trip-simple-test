import Enum from './enum.js';

/** @typedef {import('../adapter/point-adapter').default} PointAdapter */
/** @typedef {(item: PointAdapter) => boolean} PointPredicate */

export default class FilterPredicate extends Enum {
  /**
   * @type {PointPredicate}
   */
  static EVERYTHING = () => true;

  /**
   * @type {PointPredicate}
   */
  static FUTURE = (point) => Date.parse(point.endDate) > Date.now();
}
