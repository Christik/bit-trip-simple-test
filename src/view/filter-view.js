import ComponentView from './component-view.js';
import { createFilterTemplate } from './templates/filter-template.js';

export default class FilterView extends ComponentView {
  /**
   * @override
   */
  createAdjacentHtml() {
    return createFilterTemplate();
  }
}

customElements.define('trip-filter', FilterView);
