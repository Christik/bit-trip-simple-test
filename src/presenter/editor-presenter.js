import Mode from '../enum/mode.js';
import PointType from '../enum/point-type.js';
import PointLabel from '../enum/point-label.js';
import DateFormat from '../enum/date-format.js';
import Presenter from './presenter.js';
import PointAdapter from '../adapter/point-adapter.js';

/**
 * @template {ApplicationModel} Model
 * @template {EditorView} View
 * @extends {Presenter<Model,View>}
 */
export default class EditorPresenter extends Presenter {
  /**
   * @param {[model: Model, view: View]} args
   */
  constructor(...args) {
    super(...args);

    this.buildTypeSelectView();
    this.buildDestinationSelectView();
    this.buildDatePickerView();

    // TODO mode event
    this.model.addEventListener('edit', this.onPointEdit.bind(this));
    this.view.addEventListener('reset', this.onViewReset.bind(this));
    this.view.addEventListener('close', () => {
      this.model.setMode(Mode.VIEW);
    });

    this.view.pointTypeSelectView.addEventListener(
      'change',
      this.onTypeSelectChange.bind(this)
    );

    this.view.destinationSelectView.addEventListener(
      'change',
      this.updateDestinationDetailsView.bind(this)
    );

    this.view.addEventListener('submit', this.onViewSubmit.bind(this));
  }

  buildTypeSelectView() {
    /** @type {[string, string][]} */
    const options = Object.values(PointType).map((value) => {
      const key = PointType.findKey(value);
      const label = PointLabel[key];

      return [label, value];
    });

    this.view.pointTypeSelectView.setOptions(options);
  }

  buildDestinationSelectView() {
    /** @type {[string, string][]} */
    const options = this.model.destinations.listAll().map(
      (item) => ['', item.name]
    );

    this.view.destinationSelectView
      .setOptions(options);
  }

  buildDatePickerView() {
    this.view.datePickerView.configure({
      dateFormat: DateFormat.DATE_TIME,
      locale: {firstDayOfWeek: 1}
    });
  }

  buildOfferSelectView() {
    const type = this.view.pointTypeSelectView.getValue();
    const availableOffers = this.model.offerGroups.findById(type).items;

    /** @type {[number, string, number][]} */
    const options = availableOffers.map((offer) => [offer.id, offer.title, offer.price]);

    this.view.offerSelectView
      .set('hidden', !availableOffers.length)
      .setOptions(options);
  }

  updateTypeSelectView() {
    this.view.pointTypeSelectView.setValue(this.model.activePoint.type);
  }

  updateDestinationSelectView() {
    const label = PointLabel[PointType.findKey(this.model.activePoint.type)];
    const destination = this.model.destinations.findById(
      this.model.activePoint.destinationId
    );

    this.view.destinationSelectView
      .setLabel(label)
      .setValue(destination.name);
  }

  updateDatePickerView() {
    const {startDate, endDate} = this.model.activePoint;

    this.view.datePickerView.setDates(startDate, endDate);
  }

  updatePriceInput() {
    const {basePrice} = this.model.activePoint;

    this.view.priceInputView.setValue(String(basePrice));
  }

  updateOfferSelectView() {
    const type = this.view.pointTypeSelectView.getValue();
    const availableOffers = this.model.offerGroups.findById(type).items;
    const optionsChecked = availableOffers.map(
      (offer) => (this.model.activePoint.offerIds.includes(offer.id))
    );

    this.view.offerSelectView.setOptionsChecked(optionsChecked);
  }

  updateDestinationDetailsView() {
    const name = this.view.destinationSelectView.getValue();
    const destination = this.model.destinations.findBy('name', name);

    /** @type {[string, string][]} */
    const pictureOptions = destination.pictures.map(
      ({ src, description }) => [ src, description ]
    );

    this.view.destinationView
      .setDescription(destination.description)
      .setPictures(pictureOptions);
  }

  updateView() {
    this.updateTypeSelectView();
    this.updateDestinationSelectView();
    this.updateDatePickerView();
    this.updatePriceInput();
    this.buildOfferSelectView();
    this.updateOfferSelectView();
    this.updateDestinationDetailsView();

    return this;
  }

  getFormData() {
    const point = new PointAdapter();
    const destinationName = this.view.destinationSelectView.getValue();
    const [startDate, endDate] = this.view.datePickerView.getDates();

    point.type = this.view.pointTypeSelectView.getValue();
    point.destinationId = this.model.destinations.findBy('name', destinationName)?.id;
    point.startDate = startDate;
    point.endDate = endDate;
    point.basePrice = Number(this.view.priceInputView.getValue());
    point.offerIds = this.view.offerSelectView.getSelectedValues().map(Number);
    point.isFavorite = false;

    return point;
  }

  onTypeSelectChange() {
    const type = this.view.pointTypeSelectView.getValue();
    const typeLabel = PointLabel[PointType.findKey(type)];

    this.view.destinationSelectView.setLabel(typeLabel);
    this.buildOfferSelectView();
  }

  onPointEdit() {
    /** @type {PointView} */
    const linkedPointView = document.querySelector(
      `[data-id="${this.model.activePoint.id}"]`
    );

    this.view.close(true);
    this.updateView();
    this.view
      .target(linkedPointView)
      .open();
  }

  async onViewReset(event) {
    event.preventDefault();

    this.view.setRemovingMode();

    await this.model.points.remove(this.model.activePoint.id);
    this.view.close();

    this.view.unsetRemovingMode();
  }

  async onViewSubmit(event) {
    event.preventDefault();

    try {
      await this.model.points.update(this.model.activePoint.id, this.getFormData());
    } catch (exception) {
      // shake
    }
  }
}
