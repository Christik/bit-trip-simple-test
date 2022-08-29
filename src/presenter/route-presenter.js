/** @typedef {import('../model/route-model').default} RouteModel */
/** @typedef {import('../view/editor-view').default} EditorView */
/** @typedef {import('../adapter/point-adapter').default} PointAdapter */

import RouteView from '../view/route-view.js';
import PointView from '../view/point-view.js';
import { formatDate } from '../utils.js';

export default class RoutePresenter {
  /**
   * @param {RouteModel} model
   * @param {EditorView} model
   */
  constructor(model, editorView) {
    this.model = model;

    /**
     * @type {RouteView}
     */
    this.view = document.querySelector(String(RouteView));
    this.editorView = editorView;

    const points = this.model.getPoints();
    const pointViews = points.map((point) => this.createPointView(point));
    const isRouteEmpty = (points.length === 0);

    if (isRouteEmpty) {
      this.view.showPlaceholder('Click New Event to create your first point');

      return;
    }

    this.view
      .hidePlaceholder()
      .setPoints(...pointViews);
  }

  get dateFormat() {
    return 'DD/MM/YY';
  }

  get shortDateFormat() {
    return 'MMM D';
  }

  get timeFormat() {
    return 'HH:mm';
  }

  /**
   * @param {PointAdapter} point
   */
  createPointView(point) {
    const view = new PointView(point.id);
    const destination = this.model.getDestinationById(point.destinationId);
    const title = `${point.type} ${destination.name}`;
    const price = String(point.basePrice);
    const dateForHuman = formatDate(point.startDate, this.shortDateFormat);
    const startTimeForHuman = formatDate(point.startDate, this.timeFormat);
    const endTimeForHuman = formatDate(point.endDate, this.timeFormat);
    const offers = this.model.getOffers(point.type, point.offerIds);

    /**
     * @type {[string, number][]}
     */
    const offersOptions = offers.map((offer) => [offer.title, offer.price]);

    view
      .setTitle(title)
      .setIcon(point.type)
      .setDate(dateForHuman, point.startDate)
      .setStartTime(startTimeForHuman, point.startDate)
      .setEndTime(endTimeForHuman, point.endDate)
      .setPrice(price);

    view.pointOffersView.setOptions(offersOptions);

    return view;
  }
}
