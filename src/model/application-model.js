import Mode from '../enum/mode.js';
import Model from './model.js';

export default class ApplicationModel extends Model {
  /**
   * @type {number}
   */
  #mode;

  /**
   * @param {DataTableModel<Point,PointAdapter>} points
   * @param {CollectionModel<Destination,DestinationAdapter>} destinations
   * @param {CollectionModel<OfferGroup,OfferGroupAdapter>} offerGroups
   */
  constructor(points, destinations, offerGroups) {
    super();

    this.points = points;
    this.activePoint = null;
    this.destinations = destinations;
    this.offerGroups = offerGroups;
  }

  async ready() {
    await Promise.all([
      this.points.ready(),
      this.destinations.ready(),
      this.offerGroups.ready()
    ]);
  }

  getMode() {
    return this.#mode;
  }

  /**
   * @param {number} mode
   * @param {number} editablePointId
   */
  setMode(mode, editablePointId = null) {
    const eventType = Mode.findKey(mode).toLowerCase();

    this.#mode = mode;
    this.activePoint = this.points.findById(editablePointId);

    this.dispatchEvent(new CustomEvent(eventType));
  }
}
