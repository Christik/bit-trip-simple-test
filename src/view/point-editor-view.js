import BaseView from './base-view.js';
import { createPointEditorTemplate } from './point-editor-template.js';

/**
 * Представление формы редактирования точки маршрута
 */
export default class PointEditorView extends BaseView {
  #linkedView = null;

  constructor() {
    super();

    this.querySelector('.event__rollup-btn').addEventListener('click', () => {
      this.close();
    });
  }

  /**
   * @override
   */
  createTemplate() {
    return createPointEditorTemplate();
  }

  link(view) {
    this.#linkedView = view;

    return this;
  }

  open() {
    this.#linkedView.replaceWith(this);

    document.addEventListener('keydown', this);

    return this;
  }

  close() {
    this.replaceWith(this.#linkedView);

    document.removeEventListener('keydown', this);

    return this;
  }

  /**
   * @param {KeyboardEvent} event
   */
  handleEvent(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  /**
   * Устанавливает имя иконки
   * @param {string} name
   * @return {PointEditorView}
   */
  setIcon(name) {
    const element = this.querySelector('.event__type-icon');

    element.src = `img/icons/${name}.png`;

    return this;
  }

  /**
   * Отрисовывает выпадающий список типов
   * @param {HTMLElement[]} typeElements
   * @return {PointEditorView}
   */
  insertTypeList(typeElements) {
    const containerElement = this.querySelector('.event__type-group');
    const fragment = document.createDocumentFragment();

    typeElements.forEach((element) => fragment.append(element));
    containerElement.append(fragment);

    return this;
  }

  /**
   * Устанавливает название типа
   * @param {string} type
   * @return {PointEditorView}
   */
  setTypeName(type) {
    const element = this.querySelector('.event__type-output');

    element.textContent = type;

    return this;
  }

  /**
   * Устанавливает город назначения
   * @param {string} destination
   * @return {PointEditorView}
   */
  setDestinationInput(destination) {
    const element = this.querySelector('.event__input--destination');

    element.value = destination;

    return this;
  }

  /**
   * Устанавливает время начала
   * @param {string} time
   * @return {PointEditorView}
   */
  setStartTime(time) {
    const element = this.querySelector('[name="event-start-time"]');

    element.value = time;

    return this;
  }

  /**
   * Устанавливает время окончания
   * @param {string} time
   * @return {PointEditorView}
   */
  setEndTime(time) {
    const element = this.querySelector('[name="event-end-time"]');

    element.value = time;

    return this;
  }

  /**
   * Устанавливает цену
   * @param {number | string} price
   * @return {PointEditorView}
   */
  setPrice(price) {
    const element = this.querySelector('.event__input--price');

    element.value = price;

    return this;
  }

  /**
   * Отрисовывает список офферов
   * @param {HTMLElement[]} offerElements
   * @return {PointEditorView}
   */
  insertOffers(offerElements) {
    const containerElement = this.querySelector('.event__section--offers');

    if (offerElements.length === 0) {
      containerElement.remove();
      return this;
    }

    const listElement = this.querySelector('.event__available-offers');
    const fragment = document.createDocumentFragment();

    offerElements.forEach((element) => fragment.append(element));
    listElement.append(fragment);

    return this;
  }

  /**
   * Устанавливает описание города
   * @param {string} description
   * @return {PointEditorView}
   */
  setDestinationDescription(description) {
    const element = this.querySelector('.event__destination-description');

    element.textContent = description;

    return this;
  }
}

customElements.define('trip-point-editor', PointEditorView);
