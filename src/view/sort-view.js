import ComponentView from './component-view.js';
import { createSortTemplate } from './templates/sort-template.js';

export default class SortView extends ComponentView {
  /**
   * @override
   */
  createAdjacentHtml() {
    return createSortTemplate();
  }
}

customElements.define('trip-sort', SortView);
