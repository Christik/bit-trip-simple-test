/** @typedef {import('./point-view').default} PointView */

import ComponentView from './component-view.js';
import SortSelectView from './sort-select-view.js';
import Sort from '../enum/sort.js';
import SortLabel from '../enum/sort-label.js';
import SortDisabled from '../enum/sort-disabled.js';
import { html } from '../utils.js';

export default class RouteView extends ComponentView {
  constructor() {
    super();

    this.classList.add('trip-events');

    this.sortSelectView = new SortSelectView();
    this.placeholderView = this.querySelector('.trip-events__msg');
    this.listView = this.querySelector('.trip-events__list');

    this.buildSortView();
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

  buildSortView() {
    /** @type {[string, string][]} */
    const options = Object.keys(Sort).map((key) => [SortLabel[key], Sort[key]]);
    const optionsDisabled = Object.values(SortDisabled);

    this.sortSelectView
      .setOptions(options)
      .setOptionsDisabled(optionsDisabled)
      .setValue(Sort.DAY);
  }

  hidePlaceholder() {
    this.placeholderView.replaceWith(this.sortSelectView);

    return this;
  }

  /**
   * @param {string} text
   */
  showPlaceholder(text) {
    this.placeholderView.textContent = text;
    this.sortSelectView.replaceWith(this.placeholderView);

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
