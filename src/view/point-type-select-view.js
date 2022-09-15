import RadioGroupView, {html} from './radio-group-view.js';
import {getIconUrl} from '../utils.js';

export default class PointTypeSelectView extends RadioGroupView {
  constructor() {
    super(...arguments);

    this.classList.add('event__type-wrapper');
    this.addEventListener('change', this.onChange);
  }

  /**
   * @override
   */
  createTemplate() {
    return html`
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>

        </fieldset>
      </div>
    `;
  }

  createOptionTemplate(label, value) {
    return html`
      <div class="event__type-item">
        <input
          id="event-type-${value}-1"
          class="event__type-input  visually-hidden"
          type="radio"
          name="event-type"
          value="${value}"
        >
        <label
          class="event__type-label event__type-label--${value}"
          for="event-type-${value}-1"
        >
          ${label}
        </label>
      </div>
    `;
  }

  getValue() {
    /** @type {HTMLInputElement} */
    const checkedInputView = this.querySelector('[type="radio"]:checked');

    return checkedInputView.value;
  }

  /**
   * @param {[string, string][]} states
   */
  setOptions(states) {
    const templates = states.map((state) => this.createOptionTemplate(...state));

    this.querySelector('.event__type-group')
      .insertAdjacentHTML('beforeend', templates.join(''));

    return this;
  }

  /**
   * @param {string} type
   */
  setValue(type) {
    super.setValue(type);

    const imgView = this.querySelector('img');

    imgView.src = getIconUrl(type);

    return this.expand(false);
  }

  expand(flag = true) {
    this.querySelector('input').checked = flag;

    return this;
  }

  onChange(event) {
    const { type, value } = event.target;

    if (type === 'checkbox') {
      event.stopImmediatePropagation();

      return;
    }

    if (type === 'radio') {
      this
        .setValue(value)
        .expand(false);
    }
  }
}

customElements.define(String(PointTypeSelectView), PointTypeSelectView);
