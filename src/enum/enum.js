export default class Enum {
  static get defaultValue() {
    return Object.values(this)[0];
  }

  /**
   * @param {*} value
   */
  static findKey(value) {
    return Object.keys(this).find((key) => (this[key] === value));
  }
}
