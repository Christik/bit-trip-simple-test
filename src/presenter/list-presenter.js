import PointType from '../enum/point-type.js';
import PointLabel from '../enum/point-label.js';
import DateFormat from '../enum/date-format.js';
import Presenter from './presenter.js';
import { formatDate } from '../utils.js';
import Mode from '../enum/mode.js';

/**
 * @template {ApplicationModel} Model
 * @template {ListView} View
 * @extends {Presenter<Model,View>}
 */
export default class ListPresenter extends Presenter {
  /**
   * @param {[model: Model, view: View]} args
   */
  constructor(...args) {
    super(...args);

    // TODO вынести в обработчик

    this.model.points.addEventListener(
      ['add', 'update', 'remove', 'filter', 'sort'],
      this.updateView.bind(this)
    );
    this.updateView().addEventListener('point-edit', (/** @type {PointEvent} */ event) => {
      this.model.setMode(Mode.EDIT, event.detail.id);
    });
  }

  updateView() {
    const points = this.model.points.list();

    const states = points.map((point) => {
      const {startDate, endDate} = point;
      const destination = this.model.destinations.findById(point.destinationId);
      const typeLabel = PointLabel[PointType.findKey(point.type)];
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

    return this.view.setPoints(states);
  }
}
