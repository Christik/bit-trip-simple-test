import './view/trip-filter-view';
import './view/trip-route-view';
import TripPointView from './view/trip-point-view';
import './view/trip-point-editor-view';

import { render } from './render';
// import FilterView from './view/filter-view';
import SortView from './view/sort-view';
// import ListPresenter from './presenter/list-presenter';

// const filterContainerElement = document.querySelector('.trip-controls__filters');
const contentContainerElement = document.querySelector('.trip-events');
// const listPresenter = new ListPresenter();

// render(new FilterView(), filterContainerElement);
render(new SortView(), contentContainerElement);

// listPresenter.init(contentContainerElement);

document.querySelector('trip-route').append(new TripPointView());
document.querySelector('trip-route').innerHTML = '<trip-point></trip-point>';
