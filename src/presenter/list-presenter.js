import { render } from '../render';
import ListView from '../view/list-view';
import ListItemView from '../view/list-item-view';
import EditPointView from '../view/edit-point-view';
import AddNewPointView from '../view/add-new-point-view';
import EventView from '../view/event-view';

const renderListItem = (element, containerElement) => {
  const listItemComponent = new ListItemView();

  render(listItemComponent, containerElement);
  render(element, listItemComponent.getElement());
};

export default class ListPresenter {
  listComponent = new ListView();

  init(containerElement) {
    this.containerElement = containerElement;

    render(this.listComponent, this.containerElement);
    renderListItem(new EditPointView(), this.listComponent.getElement());
    renderListItem(new AddNewPointView(), this.listComponent.getElement());

    for (let i = 0; i < 3; i++) {
      renderListItem(new EventView(), this.listComponent.getElement());
    }
  }
}
