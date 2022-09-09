/**
 * @param {TemplateStringsArray} strings
 * @param  {...*} values
 * @return {string}
 */
export const html = (strings, ...values) => values.reduce(
  (result, value, index) => {
    if (typeof value === 'function') {
      value = `<${value}></${value}>`;
    }

    return result + value + strings[index + 1];
  },
  strings[0]
);

export default class ComponentView extends HTMLElement {
  constructor() {
    super();

    this.insertAdjacentHTML(
      this.adjacentHtmlPosition,
      this.createTemplate(...arguments)
    );
  }

  /**
   * @type {InsertPosition}
   */
  get adjacentHtmlPosition() {
    return 'beforeend';
  }

  /**
   * @param {...*} data
   */
  createTemplate(...data) {
    return data.join('');
  }

  static get tagNamePrefix() {
    return 'trip';
  }

  static get tagName() {
    const hyphenCaseName = this.name.replace(/[A-Z]/g, '-$&').toLowerCase();

    return this.tagNamePrefix + hyphenCaseName.replace(/-view$/, '');
  }

  static toString() {
    return this.tagName;
  }
}
