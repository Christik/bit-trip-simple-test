export default class PointAdapter {
  /**
   * @param {Point} point
   */
  constructor(point) {
    this.basePrice = point.base_price;
    this.startDate = point.date_from;
    this.endDate = point.date_to;
    this.destinationId = point.destination;
    this.id = point.id;
    this.offerIds = point.offers;
    this.type = point.type;
  }

  /**
   * @return {Point}
   */
  toJSON() {
    return {
      'base_price': this.basePrice,
      'date_from': this.startDate,
      'date_to': this.endDate,
      'destination': this.destinationId,
      'id': this.id,
      'offers': this.offerIds,
      'type': this.type
    };
  }
}
