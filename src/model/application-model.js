import Mode from '../enum/mode.js';
import PointType from '../enum/point-type.js';
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

    this.pointsModel = points;
    this.activePoint = null;
    this.destinationsModel = destinations;
    this.offerGroupsModel = offerGroups;

    // TODO: переименовать обработчики
  }

  /**
   * @override
   */
  async ready() {
    await Promise.all([
      this.pointsModel.ready(),
      this.destinationsModel.ready(),
      this.offerGroupsModel.ready()
    ]);
  }

  get defaultPoint() {
    const point = this.pointsModel.blank;
    const [firstDestination] = this.destinationsModel.listAll();

    point.type = PointType.TAXI;
    point.destinationId = firstDestination.id;
    point.startDate = new Date().toJSON();
    point.endDate = point.startDate;
    point.basePrice = 0;
    point.offerIds = [];
    point.isFavorite = false;

    return point;
  }

  getMode() {
    return this.#mode;
  }

  /**
   * @param {number} mode
   * @param {number} activePointId
   */
  setMode(mode, activePointId = null) {
    switch (mode) {
      case Mode.VIEW:
        this.activePoint = null;
        break;

      case Mode.EDIT:
        this.activePoint = this.pointsModel.findById(activePointId);
        break;

      case Mode.CREATE:
        this.activePoint = this.defaultPoint;
        break;

      default:
        throw new Error('Invalid mode');
    }

    this.#mode = mode;
    this.dispatchEvent(new CustomEvent('mode'));
  }
}
