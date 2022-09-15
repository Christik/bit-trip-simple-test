import Mode from '../enum/mode.js';
import Model from './model.js';
import PointAdapter from '../adapter/point-adapter.js';
import PointType from '../enum/point-type.js';

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
   * @param {number} activePointId
   */
  setMode(mode, activePointId = null) {
    this.#mode = mode;
    this.activePoint = null;

    if (mode === Mode.EDIT) {
      this.activePoint = this.points.findById(activePointId);
    }

    else if (mode === Mode.CREATE) {
      const point = new PointAdapter();
      const [firstDestination] = this.destinations.listAll();

      point.type = PointType.TAXI;
      point.destinationId = firstDestination.id;
      point.startDate = new Date().toJSON();
      point.endDate = point.startDate;
      point.basePrice = null;
      point.offerIds = [];

      this.activePoint = point;
    }

    this.dispatchEvent(new CustomEvent('mode'));
  }
}
