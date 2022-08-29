import ComponentView, { html } from './component-view.js';

export default class TypeOptionView extends ComponentView {
  constructor() {
    super(...arguments);

    this.classList.add('event__type-item');
  }

  /**
   * @override
   * @param {string} label
   * @param {PointType} value
   * @param {boolean} isChecked
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
}

customElements.define(String(TypeOptionView), TypeOptionView);
