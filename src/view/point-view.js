import ListItemView from './list-item-view.js';
import OfferView from './offer-view.js';
import { html, getIconUrl } from '../utils.js';

/** @typedef {import('./offer-view').State} OfferState */

/**
 * @typedef PointState
 * @prop {number} id
 * @prop {string} startIsoDate
 * @prop {string} endIsoDate
 * @prop {string} startDate
 * @prop {string} title
 * @prop {string} icon
 * @prop {string} startTime
 * @prop {string} endTime
 * @prop {string} price
 * @prop {OfferState[]} offers
 */

export default class PointView extends ListItemView {
  #id = null;

  /**
   * @param {PointState} state
   */
  constructor(state) {
    super(state);

    this.#id = state.id;

    this.setOffers(state.offers).addEventListener('click', this.onClick);
  }

  /**
   * @override
   */
  createTemplate(state) {
    return html`
      <div class="event">
        <time class="event__date" datetime="${state.startIsoDate}">${state.startDate}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${state.icon}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${state.title}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${state.startIsoDate}">${state.startTime}</time>
            &mdash;
            <time class="event__end-time" datetime="${state.endIsoDate}">${state.endTime}</time>
          </p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${state.price}</span>
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

  /**
   * @param {OfferState[]} states
   */
  setOffers(states) {
    const views = states.map((state) => new OfferView(...state));

    this.querySelector('.event__selected-offers').replaceChildren(...views);

    return this;
  }

  onClick(event) {
    if (!event.target.closest('.event__rollup-btn')) {
      return;
    }

    event.preventDefault();

    this.dispatchEvent(
      new CustomEvent('point-edit', {
        detail: this.#id,
        bubbles: true,
      })
    );
  }
}

customElements.define(String(PointView), PointView);
