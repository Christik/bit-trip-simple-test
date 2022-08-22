import FilterView from './view/filter-view.js';
import RoutePresenter from './presenter/route-presenter.js';

const contentContainerView = document.querySelector('.trip-events');
const filterContainerView = document.querySelector('.trip-controls__filters');
const routePresenter = new RoutePresenter(contentContainerView);

filterContainerView.append(new FilterView());
routePresenter.init();
