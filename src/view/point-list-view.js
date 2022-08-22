import ComponentView from './component-view.js';

/**
 * Представление маршрута со списком точек остановки
 */
export default class PointListView extends ComponentView {
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

customElements.define('trip-point-list', PointListView);
