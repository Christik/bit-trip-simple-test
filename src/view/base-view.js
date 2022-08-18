/**
 * Базовое представление
 */
export default class BaseView extends HTMLElement {
  constructor() {
    super();
    this.insertAdjacentHTML(this.insertionPosition, this.createTemplate());
  }

  /**
   * Позиция дополнительной html-разметки
   */
  get insertionPosition() {
    return 'beforeend';
  }

  /**
   * Создает дополнительную html-разметку
   * @return {string}
   */
  createTemplate() {
    return '';
  }
}
