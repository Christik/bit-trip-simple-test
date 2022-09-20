import './loader-view.css';
import View from './view.js';

export default class LoaderView extends View {
  constructor() {
    super(...arguments);

    this.classList.add('loader');
  }

  /**
   * @override
   * @param {boolean} flag
   */
  display(flag, ownerView = document.body) {
    ownerView[flag ? 'append' : 'removeChild'](this);

    return this;
  }
}

customElements.define(String(LoaderView), LoaderView);
