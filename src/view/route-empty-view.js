import ComponentView from './component-view.js';
import { createRouteEmptyTemplate } from './templates/route-empty-template.js';

/**
 * Представление маршрута, когда список пуст
 */
export default class RouteEmptyView extends ComponentView {
  /**
   * @override
   */
  createAdjacentHtml() {
    return createRouteEmptyTemplate();
  }
}

customElements.define('trip-route-empty', RouteEmptyView);
