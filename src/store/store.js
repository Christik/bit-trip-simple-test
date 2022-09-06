import StoreError from './store-error.js';

/** @typedef {string | number} ItemId */

/**
 * @template Item
 */
export default class Store {
  #baseUrl = null;
  #auth = null;

  /**
   * @param {string} baseUrl
   * @param {string} auth
   */
  constructor(baseUrl, auth) {
    this.#baseUrl = baseUrl;
    this.#auth = auth;
  }

  /**
   * @param {string} path
   * @param {RequestInit} options
   */
  request(path, options = {}) {
    const url = `${this.#baseUrl}${path}`;
    const headers = {
      'authorization': this.#auth,
      'content-type': 'application/json',
      ...options.headers
    };

    return fetch(url, {...options, headers}).then((response) => {
      if (!response.ok) {
        throw new StoreError(response);
      }
      return response.json();
    });
  }

  /**
   * @returns {Promise<Item[]>}
   */
  list() {
    return this.request('/', {
      method: 'get'
    });
  }

  /**
   * @param {Item} item
   * @returns {Promise<Item>}
   */
  add(item) {
    return this.request('/', {
      method: 'post',
      body: JSON.stringify(item)
    });
  }

  /**
   * @param {ItemId} id
   * @param {Item} item
   * @returns {Promise<Item>}
   */
  update(id, item) {
    return this.request(`/${id}`, {
      method: 'put',
      body: JSON.stringify(item)
    });
  }

  /**
   * @param {ItemId} id
   * @returns {Promise<Item>}
   */
  remove(id) {
    return this.request(`/${id}`, {
      method: 'delete'
    });
  }
}
