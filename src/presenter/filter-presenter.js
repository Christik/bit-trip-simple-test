import FilterType from '../enum/filter-type.js';
import FilterLabel from '../enum/filter-label.js';
import FilterDisabled from '../enum/filter-disabled.js';
import FilterPredicate from '../enum/filter-predicate.js';
import Presenter from './presenter.js';

/**
 * @template {ApplicationModel} Model
 * @template {FilterView} View
 * @extends {Presenter<Model,View>}
 */
export default class FilterPresenter extends Presenter {
  /**
   * @param {[model: Model, view: View]} args
   */
  constructor(...args) {
    super(...args);

    const points = this.model.points.list();

    /** @type {[string, string][]} */
    const options = Object.keys(FilterType).map(
      (key) => [FilterLabel[key], FilterType[key]]
    );

    const optionsDisabled = Object.keys(FilterType).map(
      (key) => FilterDisabled[key](points)
    );

    this.view
      .setOptions(options)
      .setOptionsDisabled(optionsDisabled)
      .setValue(FilterType.EVERYTHING);

    this.view.addEventListener('change', this.onViewChange.bind(this));
  }

  onViewChange() {
    const value = this.view.getValue();
    const predicate = FilterPredicate[FilterType.findKey(value)];

    this.model.points.setFilter(predicate);
  }
}
