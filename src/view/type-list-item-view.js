import BaseView from './base-view.js';
import { createTypeListItemTemplate } from './type-list-item-template.js';

/**
 * Представление пункта из списка типов
 */
export default class TypeListItemView extends BaseView {
  constructor() {
    super();
    this.classList.add('event__type-item');
  }

  /**
   * @override
   */
  createTemplate() {
    return createTypeListItemTemplate();
  }

  /**
   * Устанавливает id и значение инпута
   * @param {string} type
   * @param {boolean} isChecked
   * @return {TypeListItemView}
   */
  setInput(type, isChecked) {
    const element = this.querySelector('.event__type-input');

    element.id = `event-type-${type}-1`;
    element.value = type;
    element.checked = isChecked;

    return this;
  }

  /**
   * Устанавливает заголовок
   * @param {string} type
   * @param {string} title
   * @return {TypeListItemView}
   */
  setLabel(type, title) {
    const element = this.querySelector('.event__type-label');

    element.className = `event__type-label event__type-label--${type}`;
    element.htmlFor = `event-type-${type}-1`;
    element.textContent = title;

    return this;
  }
}

customElements.define('trip-type-list-item', TypeListItemView);
