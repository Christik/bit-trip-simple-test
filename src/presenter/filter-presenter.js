import Filter from '../enum/filter.js';
import FilterLabel from '../enum/filter-label.js';
import FilterDisabled from '../enum/filter-disabled.js';
import FilterPredicate from '../enum/filter-predicate.js';
import Presenter from './presenter.js';

/**
 * @template {ApplicationModel} Model
 * @template {FilterSelectView} View
 * @extends Presenter<Model,View>
 */
export default class FilterPresenter extends Presenter {
  /**
   * @param {[model: Model, view: View]} args
   */
  constructor(...args) {
    super(...args);

    /** @type {[string, string][]} */
    const options = Object.keys(Filter).map(
      (key) => [FilterLabel[key], Filter[key]]
    );

    this.view
      .setOptions(options)
      .setOptionsDisabled(this.getOptionsDisabled())
      .setValue(Filter.EVERYTHING)
      .addEventListener('change', this.onChange.bind(this));

    this.model.addEventListener(['view', 'edit', 'create'], (event) => {
      const flags = this.getOptionsDisabled();

      if (event.type !== 'view') {
        flags.fill(true);
      }

      this.view.setOptionsDisabled(flags);
    });
  }

  getOptionsDisabled() {
    return Object.values(FilterPredicate).map((predicate) =>
      !this.model.points.list(predicate).length
    );
  }

  onChange() {
    const value = this.view.getValue();
    const predicate = FilterPredicate[Filter.findKey(value)];

    this.model.points.setFilter(predicate);
  }
}
