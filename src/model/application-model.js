import Model from './model.js';

export default class ApplicationModel extends Model {
  /**
   * @param {DataTableModel<Point,PointAdapter>} points
   * @param {CollectionModel<Destination,DestinationAdapter>} destinations
   * @param {CollectionModel<OfferGroup,OfferGroupAdapter>} offerGroups
   */
  constructor(points, destinations, offerGroups) {
    super();

    this.points = points;
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
}
