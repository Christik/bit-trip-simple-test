import FormatDate from '../enum/format-date.js';
import { formatDate } from '../utils.js';
import Presenter from './presenter.js';

/**
 * @template {ApplicationModel} Model
 * @template {PointListView} View
 * @extends Presenter<Model,View>
 */
export default class PointListPresenter extends Presenter {
  /**
   * @param {[model: Model, view: View]} init
   */
  constructor(...init) {
    super(...init);

    this.model.points.addEventListener(
      ['add', 'update', 'remove', 'filter', 'sort'],
      this.updateView.bind(this)
    );

    this.updateView();
  }

  updateView() {
    const points = this.model.points.list();

    /**
     * @type {PointState[]}
     */
    const states = points.map((point) => {
      const {startDate, endDate} = point;
      const destination = this.model.destinations.findById(point.destinationId);
      const offerGroup = this.model.offerGroups.findById(point.type);

      /**
       * @type {PointState[]}
       */
      const offerStates = offerGroup.items.reduce((result, offer) => {
        if (point.offerIds.includes(offer.id)) {
          result.push([offer.title, offer.price]);
        }
        return result;
      }, []);

      return {
        id: point.id,
        startIsoDate: startDate,
        endIsoDate: endDate,
        title: destination.name,
        icon: point.type,
        startDate: formatDate(startDate, FormatDate.CALENDAR_DATE),
        startTime: formatDate(startDate, FormatDate.TIME),
        endTime: formatDate(endDate, FormatDate.TIME),
        price: String(point.basePrice),
        offers: offerStates
      };
    });

    this.view.setItems(states);
  }
}
