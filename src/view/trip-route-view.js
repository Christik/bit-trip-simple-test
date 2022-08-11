import BaseView from './base-view.js';

export default class TripRouteView extends BaseView {
  constructor() {
    super();

    this.classList.add('trip-events__list');

    [...this.children].forEach((view) => {
      view.classList.add('trip-events__item');
    });
  }
}

customElements.define('trip-route', TripRouteView);
