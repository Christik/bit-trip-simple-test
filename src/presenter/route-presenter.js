/** @typedef {import('../model/route-model').default} RouteModel */
/** @typedef {import('../view/editor-view').default} EditorView */
/** @typedef {import('../adapter/point-adapter').default} PointAdapter */
/** @typedef {import('../view/offer-view').State} OfferState */

import RouteView from '../view/route-view.js';
import PointView from '../view/point-view.js';
import FormatDate from '../enum/format-date.js';
import { formatDate } from '../utils.js';

export default class RoutePresenter {
  /**
   * @param {RouteModel} model
   */
  constructor(model) {
    this.model = model;

    /**
     * @type {RouteView}
     */
    this.view = document.querySelector(String(RouteView));

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

  /**
   * @param {PointAdapter} point
   */
  createPointView(point) {
    const view = new PointView(point.id);
    const destination = this.model.getDestinationById(point.destinationId);
    const title = `${point.type} ${destination.name}`;
    const price = String(point.basePrice);
    const dateForHuman = formatDate(point.startDate, FormatDate.CALENDAR_DATE);
    const startTimeForHuman = formatDate(point.startDate, FormatDate.TIME);
    const endTimeForHuman = formatDate(point.endDate, FormatDate.TIME);
    const offers = this.model.getOffers(point.type, point.offerIds);

    /**
     * @type {OfferState[]}
     */
    const offerStates = offers.map((offer) => [offer.title, offer.price]);

    view
      .setTitle(title)
      .setIcon(point.type)
      .setDate(dateForHuman, point.startDate)
      .setStartTime(startTimeForHuman, point.startDate)
      .setEndTime(endTimeForHuman, point.endDate)
      .setPrice(price)
      .setOffers(offerStates);

    return view;
  }
}
