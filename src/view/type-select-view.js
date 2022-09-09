import RadioGroupView, {html} from './radio-group-view.js';
import TypeOptionView from './type-option-view.js';
import {getIconUrl} from '../utils.js';

export default class TypeSelectView extends RadioGroupView {
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

  getValue() {
    /** @type {HTMLInputElement} */
    const checkedInputView = this.querySelector('[type="radio"]:checked');

    return checkedInputView.value;
  }

  /**
   * @param {[string, PointType][]} states
   */
  setOptions(states) {
    const views = states.map((state) => new TypeOptionView(...state));

    this.querySelector('legend').after(...views);

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
      event.stopPropagation();

      return;
    }

    if (type === 'radio') {
      this
        .setValue(value)
        .expand(false);
    }
  }
}

customElements.define(String(TypeSelectView), TypeSelectView);
