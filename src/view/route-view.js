/** @typedef {import('./point-view').default} PointView */

import ComponentView, { html } from './component-view.js';
import SortView from './sort-view.js';

export default class RouteView extends ComponentView {
  constructor() {
    super();

    this.classList.add('trip-events');

    this.sortView = new SortView();
    this.placeholderView = this.querySelector('.trip-events__msg');
    this.listView = this.querySelector('.trip-events__list');
  }

  /**
   * @override
   */
  createTemplate() {
    return html`
      <h2 class="visually-hidden">Trip events</h2>

      <p class="trip-events__msg">Loading...</p>

      <div class="trip-events__list"></div>
    `;
  }

  hidePlaceholder() {
    this.placeholderView.replaceWith(this.sortView);

    return this;
  }

  /**
   * @param {string} text
   */
  showPlaceholder(text) {
    this.placeholderView.textContent = text;
    this.sortView.replaceWith(this.placeholderView);

    return this;
  }

  /**
   * @param {...PointView} views
   */
  setPoints(...views) {
    views.forEach((view) => view.classList.add('trip-events__item'));
    this.listView.replaceChildren(...views);

    return this;
  }
}

customElements.define(String(RouteView), RouteView);
