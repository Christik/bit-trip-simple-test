import ComponentView from './component-view.js';

export * from './component-view.js';

export default class ListView extends ComponentView {
  constructor() {
    super(...arguments);

    this.classList.add('trip-events__list');
  }
}

