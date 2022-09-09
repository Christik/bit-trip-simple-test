import FilterPredicate from './enum/filter-predicate.js';

import Store from './store/store.js';
import CollectionModel from './model/collection-model.js';
import DataTableModel from './model/data-table-model.js';
import ApplicationModel from './model/application-model.js';

import PointAdapter from './adapter/point-adapter.js';
import DestinationAdapter from './adapter/destination-adapter.js';
import OfferGroupAdapter from './adapter/offer-group-adapter.js';

import FilterSelectView from './view/filter-select-view.js';
import SortSelectView from './view/sort-select-view.js';
import PointListView from './view/point-list-view.js';
import EditorView from './view/editor-view.js';

import FilterPresenter from './presenter/filter-presenter.js';
import SortPresenter from './presenter/sort-presenter.js';
import PointListPresenter from './presenter/point-list-presenter.js';
import EditorPresenter from './presenter/editor-presenter.js';
import CreateButtonPresenter from './presenter/create-button-presenter.js';

const BASE_URL = 'https://18.ecmascript.pages.academy/big-trip';
const POINTS_URL = `${BASE_URL}/points`;
const DESTINATIONS_URL = `${BASE_URL}/destinations`;
const OFFERS_URL = `${BASE_URL}/offers`;
const AUTH = 'Basic er118jdzbdw';

/** @type {Store<Point>} */
const pointStore = new Store(POINTS_URL, AUTH);

/** @type {Store<Destination>} */
const destinationStore = new Store(DESTINATIONS_URL, AUTH);

/** @type {Store<OfferGroup>} */
const offerStore = new Store(OFFERS_URL, AUTH);

const points = new DataTableModel(
  pointStore,
  (point) => new PointAdapter(point)
).setFilter(FilterPredicate.EVERYTHING);

const destinations = new CollectionModel(
  destinationStore,
  (destination) => new DestinationAdapter(destination)
);

const offerGroups = new CollectionModel(
  offerStore,
  (offerGroup) => new OfferGroupAdapter(offerGroup)
);

const applicationModel = new ApplicationModel(points, destinations, offerGroups);

const placeholderView = document.querySelector('.trip-events__msg');
const sortView = new SortSelectView();
const pointListView = new PointListView();

/** @type {HTMLButtonElement} */
const createButtonView = document.querySelector('.trip-main__event-add-btn');

/** @type {FilterSelectView} */
const filterView = document.querySelector(String(FilterSelectView));

applicationModel.ready().then(() => {
  placeholderView.replaceWith(sortView, pointListView);

  new FilterPresenter(applicationModel, filterView);
  new SortPresenter(applicationModel, sortView);
  new PointListPresenter(applicationModel, pointListView);
  new EditorPresenter(applicationModel, new EditorView());
  new CreateButtonPresenter(applicationModel, createButtonView);
});

const {group, groupEnd, trace} = console;

applicationModel.addEventListener(['view', 'create', 'edit'], (event) => {
  groupEnd();
  group(event.type);
});

applicationModel.points.addEventListener(['add', 'update', 'remove', 'filter', 'sort'], (event) => {
  trace(event.type);
});
