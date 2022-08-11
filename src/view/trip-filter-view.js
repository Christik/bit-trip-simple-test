import BaseView from './base-view.js';
import createAdjacentHtml from './trip-filter-template.js';

export default class TripFilterView extends BaseView {
  /**
   * @override
   */
  createAdjacentHtml() {
    return createAdjacentHtml(...arguments);
  }
}

customElements.define('trip-filter', TripFilterView);
