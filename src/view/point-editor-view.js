import ComponentView, { html } from './component-view.js';
import { isKeyEscape } from '../utils.js';
import TypeSelectView from './type-select-view.js';
import DestinationInputView from './destination-input-view.js';
import OfferSelectView from './offer-select-view.js';
import DestinationDetailsView from './destination-details-view.js';

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

  /** @type {OfferSelectView} */
  offerSelectView = this.querySelector(String(OfferSelectView));

  /** @type {DestinationDetailsView} */
  destionationDetailsView = this.querySelector(String(DestinationDetailsView));

  constructor() {
    super();

    this.expandButtonView.addEventListener('click', () => {
      this.close();
    });
  }

  /**
   * @override
   */
  createAdjacentHtml() {
    return html`
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          ${TypeSelectView}
          ${DestinationInputView}

          <!-- TODO: DatePickerView -->
          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="30/12/99 00:00">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="30/12/99 00:00">
          </div>

          <!-- TODO: PriceInputView -->
          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="0">
          </div>
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
   * Создает связь между текущей формой и точкой маршрута
   * @param {HTMLElement} view
   */
  link(view) {
    this.#linked = view;

    return this;
  }

  /**
   * Отрисовывает форму вместо точки маршрута
   */
  open() {
    this.#linked.replaceWith(this);
    document.addEventListener('keydown', this);

    return this;
  }

  /**
   * Закрывает форму и отрисовывает точку маршрута
   */
  close() {
    this.replaceWith(this.#linked);
    document.removeEventListener('keydown', this);

    return this;
  }

  /**
   * Устанавливает имя иконки
   * @param {PointType} name
   */
  setIcon(name) {
    /**
     * @type {HTMLImageElement}
     */
    const view = this.querySelector('.event__type-icon');

    view.src = `img/icons/${name}.png`;

    return this;
  }

  /**
   * Отрисовывает выпадающий список типов
   * @param {HTMLElement[]} typeViews
   */
  replaceTypeList(...typeViews) {
    const listView = this.querySelector('.event__type-group');

    listView.replaceChildren(...typeViews);

    return this;
  }

  /**
   * Устанавливает название типа
   * @param {string} type
   */
  setTypeName(type) {
    const view = this.querySelector('.event__type-output');

    view.textContent = type;

    return this;
  }

  /**
   * Устанавливает пункт назначения
   * @param {string} destination
   */
  setDestinationInput(destination) {
    /**
     * @type {HTMLInputElement}
     */
    const view = this.querySelector('.event__input--destination');

    view.value = destination;

    return this;
  }

  /**
   * Отрисовывает список пунктов назначения
   * @param  {...string} names
   */
  replaceDestinationList(...names) {
    const listView = this.querySelector('datalist');

    listView.innerHTML = '';

    names.forEach((name) => {
      const optionView = document.createElement('option');

      optionView.value = name;
      listView.append(optionView);
    });

    return this;
  }

  /**
   * Устанавливает время начала
   * @param {string} time
   */
  setStartTime(time) {
    /**
     * @type {HTMLInputElement}
     */
    const view = this.querySelector('[name="event-start-time"]');

    view.value = time;

    return this;
  }

  /**
   * Устанавливает время окончания
   * @param {string} time
   */
  setEndTime(time) {
    /**
     * @type {HTMLInputElement}
     */
    const view = this.querySelector('[name="event-end-time"]');

    view.value = time;

    return this;
  }

  /**
   * Устанавливает цену
   * @param {number} price
   */
  setPrice(price) {
    /**
     * @type {HTMLInputElement}
     */
    const view = this.querySelector('.event__input--price');

    view.value = String(price);

    return this;
  }

  /**
   * Отрисовывает список офферов
   * @param {HTMLElement[]} offerViews
   */
  replaceOffers(...offerViews) {
    const areOffersEmpty = (offerViews.length === 0);
    const isOffersContainerNotExist = !this.bodyView.contains(this.offersContainerView);

    if (areOffersEmpty) {
      this.offersContainerView?.remove();

      return this;
    }

    if (isOffersContainerNotExist) {
      this.bodyView.prepend(this.offersContainerView);
    }

    this.offerListView.replaceChildren(...offerViews);

    return this;
  }

  /**
   * Устанавливает описание города
   * @param {string} description
   */
  setDestinationDescription(description) {
    const view = this.querySelector('.event__destination-description');

    view.textContent = description;

    return this;
  }

  /**
   * Обработчик нажатия клавиши Escape
   */
  handleEvent(event) {
    if (isKeyEscape(event)) {
      this.close();
    }
  }
}

customElements.define('trip-point-editor', PointEditorView);
