/** @typedef {import('./point-view').default} PointView */

import ComponentView from './component-view.js';
import TypeSelectView from './type-select-view.js';
import DestinationSelectView from './destination-select-view.js';
import OfferSelectView from './offer-select-view.js';
import DestinationDetailsView from './destination-details-view.js';
import PriceInputView from './price-input-view.js';
import DatePickerView from './date-picker-view.js';
import { html, isKeyEscape } from '../utils.js';

export default class EditorView extends ComponentView {
  #linked = null;

  constructor() {
    super();

    this.classList.add('trip-events__item');

    this.bodyView = this.querySelector('.event__details');
    this.offersContainerView = this.querySelector('.event__section--offers');
    this.offerListView = this.querySelector('.event__available-offers');

    /**
     * @type {TypeSelectView}
     */
    this.typeSelectView = this.querySelector(String(TypeSelectView));

    /**
     * @type {DestinationSelectView}
     */
    this.destinationSelectView = this.querySelector(String(DestinationSelectView));

    /**
     * @type {PriceInputView}
     */
    this.priceInputView = this.querySelector(String(PriceInputView));

    /**
     * @type {DatePickerView}
     */
    this.datePickerView = this.querySelector(String(DatePickerView));

    /**
     * @type {OfferSelectView}
     */
    this.offerSelectView = this.querySelector(String(OfferSelectView));

    /**
     * @type {DestinationDetailsView}
     */
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
    document.addEventListener('keydown', this.onDocumentKeydown);

    return this;
  }

  close() {
    this.replaceWith(this.#linked);
    document.removeEventListener('keydown', this.onDocumentKeydown);

    return this;
  }

  onClick(event) {
    if (event.target.closest('.event__rollup-btn')) {
      this.close();
    }
  }

  /**
   * @this {Document}
   * @param {KeyboardEvent} event
   */
  onDocumentKeydown(event) {
    if (isKeyEscape(event)) {
      /** @type {EditorView} */
      const editorView = this.querySelector(String(EditorView));

      editorView.close();
    }
  }
}

customElements.define(String(EditorView), EditorView);
