import BaseView from './base-view.js';
import createAdjacentHtml from './trip-point-editor-template.js';

export default class TripPointEditorView extends BaseView {
  /**
   * @override
   */
  createAdjacentHtml() {
    return createAdjacentHtml(...arguments);
  }
}

customElements.define('trip-point-editor', TripPointEditorView);
