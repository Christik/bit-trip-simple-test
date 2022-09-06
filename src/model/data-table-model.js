import CollectionModel from './collection-model.js';

/**
 * @template Item
 * @template {Adapter} ItemAdapter
 * @extends CollectionModel<Item,ItemAdapter>
 */
export default class DataTableModel extends CollectionModel {

  /** @typedef {(item: ItemAdapter) => boolean} FilterPredicate */
  /** @typedef {(item: ItemAdapter, nextItem: ItemAdapter) => number} SortCompare */

  /** @type {FilterPredicate} */
  #filter = () => true;

  /** @type {SortCompare} */
  #sort = () => 0;

  getFilter() {
    return this.#filter;
  }

  /**
   * @param {FilterPredicate} predicate
   */
  setFilter(predicate) {
    this.#filter = predicate;

    this.dispatchEvent(new CustomEvent('filter'));

    return this;
  }

  getSort() {
    return this.#sort;
  }

  /**
   * @param {SortCompare} compare
   */
  setSort(compare) {
    this.#sort = compare;

    this.dispatchEvent(new CustomEvent('sort'));

    return this;
  }

  list(predicate = this.getFilter(), compare = this.getSort()) {
    return this.listAll().filter(predicate).sort(compare);
  }
}
