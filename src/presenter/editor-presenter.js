import Presenter from './presenter.js';
import Type from '../enum/type.js';
import TypeLabel from '../enum/type-label.js';
import Mode from '../enum/mode.js';

/**
 * @template {ApplicationModel} Model
 * @template {EditorView} View
 * @extends Presenter<Model,View>
 */
export default class EditorPresenter extends Presenter {
  // TODO: this.model.editablePoint
  #point;

  /**
   * @param {[model: Model, view: View]} args
   */
  constructor(...args) {
    super(...args);

    this.model.addEventListener('edit', this.onPointEdit.bind(this));
    this.view.addEventListener('reset', this.onViewReset.bind(this));
    this.view.addEventListener('close', () => {
      this.model.setMode(Mode.VIEW);
    });

    this.buildTypeSelectView().addEventListener(
      'change',
      this.onTypeSelectChange.bind(this)
    );

    this.buildDestinationSelectView().addEventListener(
      'change',
      this.updateDestinationDetailsView.bind(this)
    );
  }

  buildTypeSelectView() {
    /** @type {[string, PointType][]} */
    const options = Object.values(Type).map((value) => {
      const key = Type.findKey(value);
      const label = TypeLabel[key];

      return [label, value];
    });

    return this.view.typeSelectView.setOptions(options);
  }

  buildDatePicker() {}

  buildDestinationSelectView() {
    /** @type {[string, string][]} */
    const options = this.model.destinations.listAll().map(
      (item) => ['', item.name]
    );

    return this.view.destinationSelectView.setOptions(options);
  }

  buildOfferSelectView() {
    const type = this.view.typeSelectView.getValue();
    const availableOffers = this.model.offerGroups.findById(type).items;

    /** @type {[number, string, number][]} */
    const options = availableOffers.map((offer) => [offer.id, offer.title, offer.price]);

    this.view.offerSelectView.setOptions(options);
  }

  updateTypeSelectView() {
    this.view.typeSelectView.setValue(this.#point.type);
  }

  updateDestinationSelectView() {
    const label = TypeLabel[Type.findKey(this.#point.type)];
    const destination = this.model.destinations.findById(this.#point.destinationId);

    this.view.destinationSelectView
      .setLabel(label)
      .setValue(destination.name);
  }

  updateDatePickerView() {
    this.view.datePickerView
      .setEndDate(this.#point.endDate)
      .setStartDate(this.#point.startDate);
  }

  updatePriceInput() {
    this.view.priceInputView.setValue(this.#point.basePrice);
  }

  updateOfferSelectView() {
    const type = this.view.typeSelectView.getValue();
    const availableOffers = this.model.offerGroups.findById(type).items;
    const optionsChecked = availableOffers.map(
      (offer) => (this.#point.offerIds.includes(offer.id))
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

    this.view.destinationDetailsView
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

  onTypeSelectChange() {
    const type = this.view.typeSelectView.getValue();
    const typeLabel = TypeLabel[Type.findKey(type)];

    this.view.destinationSelectView.setLabel(typeLabel);
    this.buildOfferSelectView();
  }

  onPointEdit() {
    this.#point = this.model.editablePoint;

    this.view.close(true);
    this.updateView();
    this.view
      .link(document.querySelector(`#item-${this.#point.id}`))
      .open();
  }

  async onViewReset(event) {
    event.preventDefault();

    this.view.setRemovingMode();

    try {
      await this.model.points.remove(this.model.editablePoint.id);
      this.view.close();

    } catch (exception) {
      // shake формы
    }

    this.view.unsetRemovingMode();
  }
}
