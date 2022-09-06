import Adapter from './adapter.js';

export default class OfferGroupAdapter extends Adapter {
  /**
   * @param {OfferGroup} offerGroup
   */
  constructor(offerGroup) {
    super();

    this.id = offerGroup.type;
    this.items = offerGroup.offers.map((offer) => ({...offer}));
  }
}
