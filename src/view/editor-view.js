import ListItemView, {html} from './list-item-view.js';
import PointTypeSelectView from './point-type-select-view.js';
import DestinationSelectView from './destination-select-view.js';
import DatePickerView from './date-picker-view.js';
import PriceInputView from './price-input-view.js';
import OfferSelectView from './offer-select-view.js';
import DestinationView from './destination-view.js';
import {isKeyEscape} from '../utils.js';

const RemovingMode = {
  ACTIVE: 'Deleting...',
  INACTIVE: 'Delete'
};

export default class EditorView extends ListItemView {
  constructor() {
    super();

    /** @type {PointTypeSelectView} */
    this.pointTypeSelectView = this.querySelector(String(PointTypeSelectView));

    /** @type {DestinationSelectView} */
    this.destinationSelectView = this.querySelector(String(DestinationSelectView));

    /** @type {PriceInputView} */
    this.priceInputView = this.querySelector(String(PriceInputView));

    /** @type {DatePickerView} */
    this.datePickerView = this.querySelector(String(DatePickerView));

    /** @type {OfferSelectView} */
    this.offerSelectView = this.querySelector(String(OfferSelectView));

    /** @type {DestinationView} */
    this.destinationView = this.querySelector(String(DestinationView));

    /** @type {HTMLButtonElement} */
    this.submitButtonView = this.querySelector('.event__save-btn');

    /** @type {HTMLButtonElement} */
    this.resetButtonView = this.querySelector('.event__reset-btn');

    /** @type {HTMLButtonElement} */
    this.closeButtonView = this.querySelector('.event__rollup-btn');

    /** @type {Element} */
    this.targetView = null;

    this.addEventListener('click', this.onClick);
  }

  /**
   * @override
   */
  createTemplate() {
    return html`
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          ${PointTypeSelectView}
          ${DestinationSelectView}
          ${DatePickerView}
          ${PriceInputView}
          ${this.createButtonsTemplate()}
        </header>
        <section class="event__details">
          ${OfferSelectView}
          ${DestinationView}
        </section>
      </form>
    `;
  }

  createButtonsTemplate() {
    return html`
      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
  `;
  }

  /**
   * @param {Element} view
   */
  target(view) {
    this.targetView = view;

    return this;
  }

  connect() {
    this.targetView.replaceWith(this);
  }

  disconnect() {
    this.replaceWith(this.targetView);
  }

  open() {
    this.connect();

    document.addEventListener('keydown', this);

    return this;
  }

  close(silent = false) {
    this.disconnect();

    document.removeEventListener('keydown', this);

    if (!silent) {
      this.dispatchEvent(new CustomEvent('close'));
    }

    return this;
  }

  setRemovingMode() {
    this.resetButtonView.textContent = RemovingMode.ACTIVE;
    this.resetButtonView.disabled = true;
  }

  unsetRemovingMode() {
    this.resetButtonView.textContent = RemovingMode.INACTIVE;
    this.resetButtonView.disabled = false;
  }

  onClick(event) {
    if (event.target === this.closeButtonView) {
      this.close();
    }
  }

  /**
   * @param {KeyboardEvent} event
   */
  handleEvent(event) {
    if (isKeyEscape(event)) {
      this.close();
    }
  }
}

customElements.define(String(EditorView), EditorView);
