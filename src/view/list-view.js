import View from './view.js';
import PointView from './point-view';

export default class ListView extends View {
  constructor() {
    super(...arguments);

    this.classList.add('trip-events__list');
  }

  /**
   * @param {PointState[]} states
   */
  setPoints(states) {
    const views = states.map((state) => new PointView(state).setOffers(state.offers));

    this.replaceChildren(...views);

    return this;
  }
}

customElements.define(String(ListView), ListView);
