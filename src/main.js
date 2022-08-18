import FilterView from './view/filter-view.js';
import SortView from './view/sort-view.js';
import RoutePresenter from './presenter/route-presenter.js';

const contentContainerElement = document.querySelector('.trip-events');
const filterContainerElement = document.querySelector('.trip-controls__filters');
const routePresenter = new RoutePresenter();

filterContainerElement.append(new FilterView());
contentContainerElement.append(new SortView());
routePresenter.init(contentContainerElement);
