import ComponentView, { html } from './component-view.js';
import TypeSelectView from './form/type-select-view.js';
import DestinationInputView from './form/destination-input-view.js';
import OfferSelectView from './form/offer-select-view.js';
import DestinationDetailsView from './form/destination-details-view.js';
import PriceInputView from './form/price-input-view.js';
import DatePickerView from './form/date-picker-view.js';
import { isKeyEscape } from '../utils.js';

export default class PointEditorView extends ComponentView {
  #linked = null;

  bodyView = this.querySelector('.event__details');
  offersContainerView = this.querySelector('.event__section--offers');
  offerListView = this.querySelector('.event__available-offers');
  expandButtonView = this.querySelector('.event__rollup-btn');

  /** @type {TypeSelectView} */
  typeSelectView = this.querySelector(String(TypeSelectView));

  /** @type {DestinationInputView} */
  destinationInputView = this.querySelector(String(DestinationInputView));

  /** @type {PriceInputView} */
  priceInputView = this.querySelector(String(PriceInputView));

  /** @type {DatePickerView} */
  datePickerView = this.querySelector(String(DatePickerView));

  /** @type {OfferSelectView} */
  offerSelectView = this.querySelector(String(OfferSelectView));

  /** @type {DestinationDetailsView} */
  destinationDetailsView = this.querySelector(String(DestinationDetailsView));

  constructor() {
    super();

    this.expandButtonView.addEventListener('click', () => {
      this.close();
    });
  }

  /** @override */
  createTemplate() {
    return html`
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          ${TypeSelectView}
          ${DestinationInputView}
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

  /** @param {HTMLElement} view */
  link(view) {
    this.#linked = view;

    return this;
  }

  open() {
    this.#linked.replaceWith(this);
    document.addEventListener('keydown', this);

    return this;
  }

  close() {
    this.replaceWith(this.#linked);
    document.removeEventListener('keydown', this);

    return this;
  }

  handleEvent(event) {
    if (isKeyEscape(event)) {
      this.close();
    }
  }
}

customElements.define(String(PointEditorView), PointEditorView);
