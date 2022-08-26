import RouteModel from './model/route-model.js';
import './view/filter-view.js';
import RoutePresenter from './presenter/route-presenter.js';
// import EditorPresenter from './presenter/editor-presenter.js';

const routeModel = new RouteModel();

new RoutePresenter(routeModel);
// new EditorPresenter(routeModel);
