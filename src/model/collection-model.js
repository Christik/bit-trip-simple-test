import Model from './model.js';

/**
 * @template Item
 * @template {Adapter} ItemAdapter
 */
export default class CollectionModel extends Model {
  /** @type {Item[]} */
  #items;

  #store;
  #adapt;

  /**
   * @param {Store<Item>} store
   * @param {(item: Item) => ItemAdapter} adapt
   */
  constructor(store, adapt) {
    super();

    this.#store = store;
    this.#adapt = adapt;
  }

  /**
   * @override
   */
  async ready() {
    if (!this.#items) {
      this.#items = await this.#store.list();
    }
  }

  listAll() {
    return this.#items.map(this.#adapt);
  }

  /**
   * @param {string} key
   * @param {*} value
   */
  findBy(key, value) {
    return this.listAll().find((item) => item[key] === value);
  }

  /**
   * @param {ItemId} value
   */
  findById(value) {
    return this.findBy('id', value);
  }

  /**
   * @param {string} key
   * @param {*} value
   */
  findIndexBy(key, value) {
    return this.listAll().findIndex((item) => item[key] === value);
  }

  /**
   * @param {ItemId} value
   */
  findIndexById(value) {
    return this.findIndexBy('id', value);
  }

  /**
   * @param {ItemAdapter} item
   */
  async add(item) {
    const newItem = await this.#store.add(item.toJSON());

    this.#items.push(newItem);

    this.dispatchEvent(
      new CustomEvent('add', {
        detail: this.#adapt(newItem)
      })
    );
  }

  /**
   * @param {ItemId} id
   * @param {ItemAdapter} item
   */
  async update(id, item) {
    const updatedItem = await this.#store.update(id, item.toJSON());
    const index = this.findIndexById(id);

    this.#items.splice(index, 1, updatedItem);

    this.dispatchEvent(
      new CustomEvent('update', {
        detail: this.#adapt(updatedItem)
      })
    );
  }

  /**
   * @param {ItemId} id
   */
  async remove(id) {
    await this.#store.remove(id);

    const index = this.findIndexById(id);
    const [removedItem] = this.#items.splice(index, 1);

    this.dispatchEvent(
      new CustomEvent('remove', {
        detail: this.#adapt(removedItem)
      })
    );
  }
}
