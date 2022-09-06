import Adapter from './adapter.js';

export default class DestinationAdapter extends Adapter {
  /**
   * @param {Destination} destination
   */
  constructor(destination) {
    super();

    this.id = destination.id;
    this.description = destination.description;
    this.name = destination.name;
    this.pictures = destination.pictures.map((picture) => ({...picture}));
  }
}
