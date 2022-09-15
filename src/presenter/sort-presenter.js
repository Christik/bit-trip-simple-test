import SortType from '../enum/sort-type.js';
import SortLabel from '../enum/sort-label.js';
import SortDisabled from '../enum/sort-disabled.js';
import Presenter from './presenter.js';
import SortPredicate from '../enum/sort-predicate.js';

const SORT_DEFAULT = SortType.DAY;

/**
 * @template {ApplicationModel} Model
 * @template {SortView} View
 * @extends {Presenter<Model,View>}
 */
export default class SortPresenter extends Presenter {
  /**
   * @param {[model: Model, view: View]} args
   */
  constructor(...args) {
    super(...args);

    /** @type {[string, string][]} */
    const options = Object.keys(SortType).map((key) => [SortLabel[key], SortType[key]]);

    const optionsDisabled = Object.values(SortDisabled);

    this.view
      .setOptions(options)
      .setOptionsDisabled(optionsDisabled)
      .setValue(SORT_DEFAULT);

    this.view.addEventListener('change', this.onViewChange.bind(this));
    this.model.points.addEventListener('filter', this.onModelPointsFilter.bind(this));
  }

  onViewChange() {
    const value = this.view.getValue();
    const compare = SortPredicate[SortType.findKey(value)];

    this.model.points.setSort(compare);
  }

  onModelPointsFilter() {
    this.view.setValue(SORT_DEFAULT);
    this.model.points.setSort(SortPredicate.DEFAULT);
  }
}
