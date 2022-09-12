import './list-item-view.css';
import View from './view.js';

export * from './view.js';

export default class ListItemView extends View {
  constructor() {
    super(...arguments);

    this.classList.add('trip-events__item');
  }
}
