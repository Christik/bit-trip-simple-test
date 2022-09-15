import FilterEmpty from '../enum/filter-empty.js';
import FilterPredicate from '../enum/filter-predicate.js';
import Presenter from './presenter.js';

/**
 * @template {ApplicationModel} Model
 * @template {HTMLParagraphElement} View
 * @extends {Presenter<Model,View>}
 */
export default class PlaceholderPresenter extends Presenter {
  /**
   * @param {[model: Model, view: View]} args
   */
  constructor(...args) {
    super(...args);

    this.updateView();

    this.model.points.addEventListener(
      ['add', 'remove'],
      this.onModelPointsChange.bind(this)
    );
  }

  updateView() {
    const {length} = this.model.points.list();
    const key = FilterPredicate.findKey(this.model.points.getFilter());

    this.view.textContent = length ? '' : FilterEmpty[key];
    this.view.hidden = Boolean(length);
  }

  onModelPointsChange() {
    this.updateView();
  }
}
