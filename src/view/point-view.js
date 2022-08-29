import ComponentView, { html } from './component-view.js';
import PointOffersView from './point-offers-view.js';
import { getIconUrl } from '../utils.js';

export default class PointView extends ComponentView {
  #id;

  /**
   * @param {number} id
   */
  constructor(id) {
    super();

    this.#id = id;

    /**
     * @type {PointOffersView}
     */
    this.pointOffersView = this.querySelector(String(PointOffersView));

    this.addEventListener('click', this.onClick);
  }

  onClick(event) {
    if (!event.target.closest('.event__rollup-btn')) {
      return;
    }

    this.dispatchEvent(
      new CustomEvent('point-edit', {
        detail: this.#id,
        bubbles: true
      })
    );
  }

  /**
   * @override
   */
  createTemplate() {
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
        ${PointOffersView}
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    `;
  }

  /**
   * @param {string} title
   */
  setTitle(title) {
    const view = this.querySelector('.event__title');

    view.textContent = title;

    return this;
  }

  /**
   * @param {PointType} name
   */
  setIcon(name) {
    /**
     * @type {HTMLImageElement}
     */
    const view = this.querySelector('.event__type-icon');

    view.src = getIconUrl(name);

    return this;
  }

  /**
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
   * @param {string} price
   */
  setPrice(price) {
    const view = this.querySelector('.event__price-value');

    view.textContent = price;

    return this;
  }
}

customElements.define(String(PointView), PointView);
