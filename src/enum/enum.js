export default class Enum {
  /**
   * @param {*} value
   */
  static resolveKey(value) {
    return Object.keys(this).find((key) => this[key] === value);
  }
}
