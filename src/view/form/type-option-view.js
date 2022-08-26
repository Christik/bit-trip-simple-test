import ComponentView, { html } from '../component-view.js';

export default class TypeOptionView extends ComponentView {
  constructor() {
    super(...arguments);

    this.classList.add('event__type-item');
  }

  /**
   * @override
   * @param {string} label
   * @param {PointType} value
   */
  createTemplate(label, value, isChecked) {
    return html`
      <input 
        id="event-type-${value}-1" 
        class="event__type-input  visually-hidden" 
        type="radio" 
        name="event-type" 
        value="${value}"
        ${isChecked ? 'checked' : ''}
      >
      <label 
        class="event__type-label event__type-label--${value}" 
        for="event-type-${value}-1"
      >
        ${label}
      </label>
    `;
  }

  //TODO: убрать методы
  /**
   * Устанавливает id и значение у input
   * @param {PointType} type
   * @param {boolean} isChecked
   */
  setInput(type, isChecked) {
    /**
     * @type {HTMLInputElement}
     */
    const view = this.querySelector('.event__type-input');

    view.id = `event-type-${type}-1`;
    view.value = type;
    view.checked = isChecked;

    return this;
  }

  /**
   * Устанавливает заголовок
   * @param {PointType} type
   * @param {string} title
   */
  setLabel(type, title) {
    /**
     * @type {HTMLLabelElement}
     */
    const view = this.querySelector('.event__type-label');

    view.className = `event__type-label event__type-label--${type}`;
    view.htmlFor = `event-type-${type}-1`;
    view.textContent = title;

    return this;
  }
}

customElements.define(String(TypeOptionView), TypeOptionView);
