import ComponentView, { html } from './component-view.js';

/**
 * Представление точки маршрута
 */
export default class PointView extends ComponentView {
  expandButtonView = this.querySelector('.event__rollup-btn');

  constructor() {
    super();

    this.expandButtonView.addEventListener('click', () => {
      const expandEvent = new CustomEvent('expand');
      this.dispatchEvent(expandEvent);
    });
  }

  /**
   * @override
   */
  createAdjacentHtml() {
    return html`
      <div class="event">
        <time class="event__date" datetime="2000-01-01">DEC 00</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/name.png" alt="Event type icon">
        </div>
        <h3 class="event__title">Type City</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="2000-01-01T00:00">00:00</time>
            &mdash;
            <time class="event__end-time" datetime="2000-01-01T00:00">00:00</time>
          </p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">0</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <div class="event__selected-offers">
        </div>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    `;
  }

  /**
   * Устанавливает заголовок
   * @param {string} title
   */
  setTitle(title) {
    const view = this.querySelector('.event__title');

    view.textContent = title;

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
   * Устанавливает дату
   * @param {string} dateForHuman
   * @param {string} dateForMachine
   */
  setDate(dateForHuman, dateForMachine) {
    /**
     * @type {HTMLTimeElement}
     */
    const view = this.querySelector('.event__date');

    view.textContent = dateForHuman;
    view.dateTime = dateForMachine;

    return this;
  }

  /**
   * Устанавливает время начала
   * @param {string} timeForHuman
   * @param {string} timeForMachine
   */
  setStartTime(timeForHuman, timeForMachine) {
    /**
     * @type {HTMLTimeElement}
     */
    const view = this.querySelector('.event__start-time');

    view.textContent = timeForHuman;
    view.dateTime = timeForMachine;

    return this;
  }

  /**
   * Устанавливает время окончания
   * @param {string} timeForHuman
   * @param {string} timeForMachine
   */
  setEndTime(timeForHuman, timeForMachine) {
    /**
     * @type {HTMLTimeElement}
     */
    const view = this.querySelector('.event__end-time');

    view.textContent = timeForHuman;
    view.dateTime = timeForMachine;

    return this;
  }

  /**
   * Устанавливает цену
   * @param {string} price
   */
  setPrice(price) {
    const view = this.querySelector('.event__price-value');

    view.textContent = price;

    return this;
  }

  /**
   * Добавляет DOM-элементы оферов
   * @param {...HTMLElement} offerViews
   */
  replaceOffers(...offerViews) {
    const view = this.querySelector('.event__selected-offers');

    view.replaceChildren(...offerViews);

    return this;
  }
}

customElements.define('trip-point', PointView);
