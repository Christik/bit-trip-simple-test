import './destination-select-view.css';
import ComponentView, {html} from './component-view.js';

export default class DestinationInputView extends ComponentView {
  #options = null;

  constructor() {
    super(...arguments);

    this.classList.add('event__field-group', 'event__field-group--destination');

    this.addEventListener('focus', this.onFocus, true);
    this.addEventListener('change', this.onChange);
    this.addEventListener('keydown', this.onKeydown);
    this.addEventListener('blur', this.onBlur);

    /** @type {HTMLLabelElement} */
    this.labelView = this.querySelector('.event__type-output');

    /** @type {HTMLInputElement} */
    this.inputView = this.querySelector('.event__input--destination');

    /** @type {HTMLDataListElement} */
    this.datalistView = this.querySelector('datalist');
  }

  /**
   * @override
   */
  createTemplate() {
    return html`
      <label
        class="event__label  event__type-output"
        for="event-destination-1"
      ></label>
      <input
        class="event__input event__input--destination"
        id="event-destination-1"
        type="text"
        name="event-destination"
        value=""
        list="destination-list-1"
      >
      <datalist id="destination-list-1"></datalist>
    `;
  }

  get allowedKeys() {
    return ['Tab', 'ArrowUp', 'ArrowDown', 'Escape'];
  }

  /**
   * @param {string} label
   */
  setLabel(label) {
    const view = this.querySelector('.event__type-output');

    view.textContent = label;

    return this;
  }

  getValue() {
    return this.inputView.value || this.inputView.placeholder;
  }

  /**
   * @param {string} value
   */
  setValue(value) {
    this.inputView.value = value;

    return this;
  }

  /**
   * @param {[string, string][]} states
   */
  setOptions(states) {
    const views = states.map((state) => new Option(...state));

    this.datalistView.replaceChildren(...views);
    this.#options = states;

    return this;
  }

  moveValueToPlaceholder() {
    const { inputView } = this;

    inputView.placeholder = inputView.value;
    inputView.value = '';
  }

  movePlaceholderToValue() {
    const { inputView } = this;

    inputView.value = inputView.placeholder;
    inputView.placeholder = '';
  }

  onFocus() {
    this.moveValueToPlaceholder();
  }

  onChange() {
    this.moveValueToPlaceholder();
    this.dispatchEvent(new CustomEvent('destination-change'));
  }

  onKeydown(event) {
    if (!this.allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  }

  onBlur() {
    this.movePlaceholderToValue();
  }
}

customElements.define(String(DestinationInputView), DestinationInputView);
