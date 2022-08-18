import BaseView from './base-view.js';

/**
 * Представление маршрута со списком точек остановки
 */
export default class RouteView extends BaseView {
  constructor() {
    super();
    this.classList.add('trip-events__list');
  }

  connectedCallback() {
    [...this.children].forEach((view) => {
      view.classList.add('trip-events__item');
    });
  }
}

customElements.define('trip-route', RouteView);
