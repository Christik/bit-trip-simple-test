import { getOfferGroups } from '../fish/offerGroups.js';

export default class OffersModel {
  get() {
    return getOfferGroups();
  }
}
