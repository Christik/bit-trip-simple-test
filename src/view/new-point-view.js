import BaseView from './base-view.js';
import { createNewPointTemplate } from './new-point-template.js';

export default class NewPointView extends BaseView {
  /**
   * @override
   */
  createTemplate() {
    return createNewPointTemplate();
  }
}

customElements.define('trip-new-point', NewPointView);
