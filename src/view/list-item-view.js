import { createElement } from '../render';

const createListItemTemplate = () => '<li class="trip-events__item"></li>';

export default class ListItemView {
  getTemplate() {
    return createListItemTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
