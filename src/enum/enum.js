export default class Enum {
  /**
   * @param {*} value
   */
  static findKey(value) {
    return Object.keys(this).find((key) => (this[key] === value));
  }
}
