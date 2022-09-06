/** @typedef {import('../model/route-model').default} RouteModel */

import FilterLabel from '../enum/filter-label.js';
import FilterDisabled from '../enum/filter-disabled.js';
import Filter from '../enum/filter.js';
import FilterSelectView from '../view/filter-select-view.js';

export default class FilterPresenter {
  /**
   * @param {RouteModel} model
   */
  constructor(model) {
    this.model = model;

    const filterContainerView = document.querySelector('.trip-controls__filters');
    const points = this.model.getPoints();

    /** @type {[string, string][]} */
    const options = Object.keys(Filter).map(
      (key) => [FilterLabel[key], Filter[key]]
    );

    /** @type {boolean[]} */
    const optionsDisabled = Object.keys(Filter).map(
      (key) => FilterDisabled[key](points)
    );

    this.view = new FilterSelectView();
    this.view
      .setOptions(options)
      .setOptionsDisabled(optionsDisabled)
      .setValue(Filter.EVERYTHING);

    filterContainerView.append(this.view);
  }
}
