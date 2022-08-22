import ComponentView from './component-view.js';
import { createNewPointTemplate } from './templates/new-point-template.js';

export default class NewPointView extends ComponentView {
  /**
   * @override
   */
  createAdjacentHtml() {
    return createNewPointTemplate();
  }
}

customElements.define('trip-new-point', NewPointView);
