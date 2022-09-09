import './list-item-view.css';
import ComponentView from './component-view.js';

export * from './component-view.js';

export default class ListItemView extends ComponentView {
  constructor() {
    super(...arguments);

    this.classList.add('trip-events__item');
  }
}
