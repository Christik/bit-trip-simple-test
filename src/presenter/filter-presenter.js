/** @typedef {import('../model/route-model').default} RouteModel */

import FilterSelectView from '../view/filter-select-view.js';
import Filter from '../enum/filter.js';
import FilterLabel from '../enum/filter-label.js';
import FilterPredicate from '../enum/filter-predicate.js';

export default class FilterPresenter {
  /**
   * @param {RouteModel} model
   */
  constructor(model) {
    this.model = model;
    this.view = new FilterSelectView();

    const filterContainerView = document.querySelector('.trip-controls__filters');
    const points = this.model.getPoints();

    this.view
      .setOptions(
        Object.keys(Filter).map((key) => [FilterLabel[key], Filter[key]])
      )
      .setOptionsDisabled(
        Object.keys(Filter).map((key) => !points.filter(FilterPredicate[key]).length)
      )
      .select(Filter.EVERYTHING);

    filterContainerView.append(this.view);
  }
}
