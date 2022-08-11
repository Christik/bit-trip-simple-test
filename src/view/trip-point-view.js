import BaseView from './base-view.js';
import createAdjacentHtml from './trip-point-template.js';

export default class TripPointView extends BaseView {
  /**
   * @override
   */
  createAdjacentHtml() {
    return createAdjacentHtml(...arguments);
  }
}

customElements.define('trip-point', TripPointView);
