import FilterPresenter from './presenter/filter-presenter.js';
import RoutePresenter from './presenter/route-presenter.js';
import RouteModel from './model/route-model.js';
import EditorPresenter from './presenter/editor-presenter.js';

const routeModel = new RouteModel();

routeModel.ready().then(() => {
  new FilterPresenter(routeModel);
  new RoutePresenter(routeModel);
  new EditorPresenter(routeModel);
});

