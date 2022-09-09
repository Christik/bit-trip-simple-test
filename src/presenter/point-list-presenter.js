import Mode from '../enum/mode.js';
import Type from '../enum/type.js';
import TypeLabel from '../enum/type-label.js';
import DateFormat from '../enum/date-format.js';
import Presenter from './presenter.js';
import { formatDate } from '../utils.js';

/**
 * @template {ApplicationModel} Model
 * @template {PointListView} View
 * @extends Presenter<Model,View>
 */
export default class PointListPresenter extends Presenter {
  /**
   * @param {[model: Model, view: View]} args
   */
  constructor(...args) {
    super(...args);

    this.model.points.addEventListener(
      ['add', 'update', 'remove', 'filter', 'sort'],
      this.updateView.bind(this)
    );

    this.updateView().addEventListener('point-edit', (/** @type {CustomEvent} */ event) => {
      this.model.setMode(Mode.EDIT, event.detail);
    });
  }

  updateView() {
    const points = this.model.points.list();

    const states = points.map((point) => {
      const {startDate, endDate} = point;
      const destination = this.model.destinations.findById(point.destinationId);
      const typeLabel = TypeLabel[Type.findKey(point.type)];
      const title = `${typeLabel} ${destination.name}`;
      const offerGroup = this.model.offerGroups.findById(point.type);

      const offerStates = offerGroup.items.reduce((result, offer) => {
        if (point.offerIds.includes(offer.id)) {
          result.push([offer.title, offer.price]);
        }
        return result;
      }, []);

      return {
        id: point.id,
        type: point.type,
        startIsoDate: startDate,
        endIsoDate: endDate,
        title,
        icon: point.type,
        startDate: formatDate(startDate, DateFormat.CALENDAR_DATE),
        startTime: formatDate(startDate, DateFormat.TIME),
        endTime: formatDate(endDate, DateFormat.TIME),
        price: String(point.basePrice),
        offers: offerStates
      };
    });

    return this.view.setItems(states);
  }
}
