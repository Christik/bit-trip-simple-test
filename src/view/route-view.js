import ComponentView from './component-view.js';

/**
 * Представление маршрута со списком точек остановки
 */
export default class RouteView extends ComponentView {
  /**
   * Отрисовывает новое содержимое маршрута
   * @param {...HTMLElement} views
   */
  replaceContent(...views) {
    this.replaceChildren(...views);

    return this;
  }
}

document.querySelector(String(RouteView));

customElements.define('trip-route', RouteView);
