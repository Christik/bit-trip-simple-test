import { generatePoint } from '../fish/point.js';
import { getOfferGroups } from '../fish/offerGroups.js';
import DestinationsModel from './destinations-model.js';

const offerGroups = getOfferGroups();

export default class PointsModel {
  getOffersByType(type) {
    return offerGroups.find((offerGroup) => (offerGroup.type === type)).offers;
  }

  get() {
    const points = Array.from({length: 20}, generatePoint);
    const destinationsModel = new DestinationsModel();
    const destinations = destinationsModel.get();

    return points.map((point) => {
      const aggregatePoint = {
        basePrice: point['base_price'],
        dateFrom: point['date_from'],
        dateTo: point['date_to'],
        id: point.id,
        type: point.type,
        offers: offerGroups.find((group) => (group.type === point.type)).offers.slice(0, 2),
        destination: destinations.find((destination) => destination.id === point.destination),
      };

      /**
       * @type {AggregatedPoint}
       */
      return aggregatePoint;
    });
  }
}
