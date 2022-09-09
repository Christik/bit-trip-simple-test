import Sort from '../enum/sort.js';
import SortLabel from '../enum/sort-label.js';
import SortDisabled from '../enum/sort-disabled.js';
import Presenter from './presenter.js';
import SortPredicate from '../enum/sort-predicate.js';

const SORT_DEFAULT = Sort.DAY;

/**
 * @template {ApplicationModel} Model
 * @template {SortSelectView} View
 * @extends Presenter<Model,View>
 */
export default class SortPresenter extends Presenter {
  /**
   * @param {[model: Model, view: View]} args
   */
  constructor(...args) {
    super(...args);

    /** @type {[string, string][]} */
    const options = Object.keys(Sort).map((key) => [SortLabel[key], Sort[key]]);

    const optionsDisabled = Object.values(SortDisabled);

    this.view
      .setOptions(options)
      .setOptionsDisabled(optionsDisabled)
      .setValue(Sort.DAY);

    this.view.addEventListener('change', this.onChange.bind(this));
    this.model.points.addEventListener('filter', this.onFilter.bind(this));
  }

  onChange() {
    const value = this.view.getValue();
    const compare = SortPredicate[Sort.findKey(value)];

    this.model.points.setSort(compare);
  }

  onFilter() {
    this.view.setValue(SORT_DEFAULT);
    this.model.points.setSort(SortPredicate.DEFAULT);
  }
}
