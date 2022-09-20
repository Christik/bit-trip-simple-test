import SaveButtonLabel from '../enum/save-button-label.js';
import ListItemView, {html} from './list-item-view.js';
import PointTypeSelectView from './point-type-select-view.js';
import DestinationSelectView from './destination-select-view.js';
import DatePickerView from './date-picker-view.js';
import PriceInputView from './price-input-view.js';
import OfferSelectView from './offer-select-view.js';
import DestinationView from './destination-view.js';
import {isKeyEscape} from '../format.js';
import LoaderView from './loader-view';

export default class CreatorView extends ListItemView {
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

    /** @type {Element} */
    this.targetView = null;

    this.loaderView = new LoaderView();

    this.formView = this.querySelector('form');
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
      <button class="event__save-btn  btn  btn--blue" type="submit">
        ${SaveButtonLabel.DEFAULT}
      </button>
      <button class="event__reset-btn" type="reset">
        Cancel
      </button>
    `;
  }

  /**
   * @param {boolean} flag
   */
  setDisabled(flag) {
    [...this.formView].forEach((/** @type {HTMLInputElement} */ inputView) => {
      inputView.disabled = flag;
    });
  }

  /**
   * @param {boolean} flag
   */
  setSaving(flag) {
    /** @type {HTMLButtonElement} */
    const buttonView = this.querySelector('.event__save-btn');

    buttonView.textContent = flag ? SaveButtonLabel.PRESSED : SaveButtonLabel.DEFAULT;

    this.setDisabled(flag);
    this.loaderView.display(flag);
  }

  /**
   * @param {Element} view
   */
  target(view) {
    this.targetView = view;

    return this;
  }

  /**
   * @override
   * @param {boolean} flag
   */
  display(flag) {
    if (flag) {
      this.targetView.prepend(this);
    } else {
      this.remove();
    }

    return this;
  }

  open() {
    this.display(true);

    document.addEventListener('keydown', this);

    return this;
  }

  close(silent = false) {
    this.display(false);

    document.removeEventListener('keydown', this);

    if (!silent) {
      this.dispatchEvent(new CustomEvent('close'));
    }

    return this;
  }

  /**
   * @param {KeyboardEvent} event
   */
  handleEvent(event) {
    if (event.key?.startsWith('Esc')) {
      this.close();
    }
  }
}

customElements.define(String(CreatorView), CreatorView);
