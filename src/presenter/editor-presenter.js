/** @typedef {import('../model/route-model').default} RouteModel */
/** @typedef {import('../adapter/point-adapter').default} PointAdapter */
/** @typedef {import('../view/point-view').default} PointView */

import EditorView from '../view/editor-view.js';
import Type from '../enum/type.js';
import TypeLabel from '../enum/type-label.js';
import { getOfferSelectOptions, formatDate } from '../utils.js';

export default class EditorPresenter {
  /**
   * @param {RouteModel} model
   */
  constructor(model) {
    this.model = model;
    this.view = new EditorView();

    document.addEventListener('point-edit', this.onPointEdit.bind(this));
    this.view.addEventListener('type-change', this.onTypeChange.bind(this), true);
    this.view.addEventListener('destination-change', this.onDestinationChange.bind(this), true);
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

  // TODO: разбить на мелкие методы

  /**
   * @param {PointAdapter} point
   */
  updateView(point) {
    const typeTitle = TypeLabel[Type.findKey(point.type)];
    const destination = this.model.getDestinationById(point.destinationId);

    const startDate = formatDate(point.startDate, this.dateFormat);
    const startTime = formatDate(point.startDate, this.timeFormat);
    const startDateTime = `${startDate} ${startTime}`;

    const endDate = formatDate(point.endDate, this.dateFormat);
    const endTime = formatDate(point.endDate, this.timeFormat);
    const endDateTime = `${endDate} ${endTime}`;

    /**
     * @type {[string, PointType, boolean][]}
     */
    const typeSelectOptions = Object.values(Type).map((type) => {
      const key = Type.findKey(type);
      const label = TypeLabel[key];
      const isChecked = type === point.type;

      return [label, type, isChecked];
    });

    /**
     * @type {[string, string][]}
     */
    const destinationInputOptions = this.model
      .getDestinations()
      .map((item) => ['', item.name]);

    /**
     * @type {[number, string, number, boolean][]}
     */
    const offerSelectOptions = getOfferSelectOptions(
      this.model.getAvailableOffers(point.type),
      point.offerIds
    );

    /**
     * @type {[string, string][]}
     */
    const pictureOptions = destination.pictures.map(({ src, description }) => [
      src,
      description,
    ]);

    const {
      typeSelectView,
      destinationInputView,
      datePickerView,
      priceInputView,
      offerSelectView,
      destinationDetailsView,
    } = this.view;

    typeSelectView.setIcon(point.type).setOptions(typeSelectOptions);


    destinationInputView
      .setLabel(typeTitle)
      .setValue(destination.name)
      // TODO: перенести в конструктор
      .setOptions(destinationInputOptions);

    datePickerView.setStartDate(startDateTime).setEndDate(endDateTime);

    priceInputView.setValue(point.basePrice);
    offerSelectView.setOptions(offerSelectOptions);

    destinationDetailsView
      .setDescription(destination.description)
      .setPictures(pictureOptions);

    return this.view;
  }

  /**
   * @param {CustomEvent & { target: PointView, detail: number }} event
   */
  onPointEdit(event) {
    const point = this.model.getPointById(event.detail);

    this.view.close();
    this.updateView(point);
    this.view
      .link(event.target)
      .open();

  }

  onTypeChange(event) {
    const type = event.detail;
    const typeLabel = TypeLabel[Type.findKey(type)];
    const offerSelectOptions = getOfferSelectOptions(
      this.model.getAvailableOffers(type)
    );

    this.view.destinationInputView.setLabel(typeLabel);
    this.view.offerSelectView.setOptions(offerSelectOptions);
  }

  onDestinationChange(event) {
    console.log(event.target.getValue());
  }
}
