import ComponentView from './component-view.js';

/*
PointCreatorView extends ListItemView
PointEditorView extends PointCreatorView
PointView extends ListItemView
PointListView extends ListView
*/

export default class ListItemView extends ComponentView {
  constructor() {
    super(...arguments);

    this.classList.add('trip-events__item');
  }
}
