import BaseView from './base-view.js';
import { createFilterTemplate } from './filter-template.js';

export default class FilterView extends BaseView {
  /**
   * @override
   */
  createTemplate() {
    return createFilterTemplate();
  }
}

customElements.define('trip-filter', FilterView);
