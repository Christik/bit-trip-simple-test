import './placeholder-view.css';
import ComponentView from './component-view.js';

export default class PlaceholderView extends ComponentView {
  constructor() {
    super(...arguments);

    this.classList.add('trip-events__msg');
  }

  setMessage(text) {
    this.textContent = text;

    return this;
  }
}

customElements.define(String(PlaceholderView), PlaceholderView);
