import ListItemView, {html} from './list-item-view.js';
import TypeSelectView from './type-select-view.js';
import DestinationSelectView from './destination-select-view.js';
import DatePickerView from './date-picker-view.js';
import PriceInputView from './price-input-view.js';
import OfferSelectView from './offer-select-view.js';
import DestinationDetailsView from './destination-details-view.js';
import {isKeyEscape} from '../utils.js';
import Mode from '../enum/mode.js';

const RemovingMode = {
  ACTIVE: 'Deleting...',
  INACTIVE: 'Delete'
};

export default class EditorView extends ListItemView {
  #linked;

  constructor() {
    super();

    this.removeSelector = '.event__reset-btn';
    this.closeSelector = '.event__rollup-btn';

    this.bodyView = this.querySelector('.event__details');
    this.offersContainerView = this.querySelector('.event__section--offers');
    this.offerListView = this.querySelector('.event__available-offers');

    /** @type {HTMLButtonElement} */
    this.removeView = this.querySelector(this.removeSelector);

    /** @type {TypeSelectView} */
    this.typeSelectView = this.querySelector(String(TypeSelectView));

    /** @type {DestinationSelectView} */
    this.destinationSelectView = this.querySelector(String(DestinationSelectView));

    /** @type {PriceInputView} */
    this.priceInputView = this.querySelector(String(PriceInputView));

    /** @type {DatePickerView} */
    this.datePickerView = this.querySelector(String(DatePickerView));

    /** @type {OfferSelectView} */
    this.offerSelectView = this.querySelector(String(OfferSelectView));

    /** @type {DestinationDetailsView} */
    this.destinationDetailsView = this.querySelector(String(DestinationDetailsView));

    this.addEventListener('click', this.onClick);
  }

  /**
   * @override
   */
  createTemplate() {
    return html`
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          ${TypeSelectView}
          ${DestinationSelectView}
          ${DatePickerView}
          ${PriceInputView}
          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
          ${OfferSelectView}
          ${DestinationDetailsView}
        </section>
      </form>
    `;
  }

  /**
   * @param {PointView} view
   */
  link(view) {
    this.#linked = view;

    return this;
  }

  open() {
    this.#linked.replaceWith(this);
    document.addEventListener('keydown', this);

    return this;
  }

  close(silent = false) {
    this.replaceWith(this.#linked);
    document.removeEventListener('keydown', this);

    if (!silent) {
      this.dispatchEvent(new CustomEvent('close'));
    }

    return this;
  }

  reset() {
    this.querySelector('form').reset();
  }

  setRemovingMode() {
    this.removeView.textContent = RemovingMode.ACTIVE;
    this.removeView.disabled = true;
  }

  unsetRemovingMode() {
    this.removeView.textContent = RemovingMode.INACTIVE;
    this.removeView.disabled = false;
  }

  onClick(event) {
    if (event.target.closest(this.closeSelector)) {
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
