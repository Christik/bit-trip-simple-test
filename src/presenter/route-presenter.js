import RouteView from '../view/route-view.js';
import PointsModel from '../model/points-model.js';
import TypeListItemView from '../view/type-list-item-view.js';
import OfferSelectorView from '../view/offer-selector-view.js';
import PointEditorView from '../view/point-editor-view.js';
import { capitalizeFirstLetter, formatDate } from '../utils.js';
import {POINT_TYPES} from '../const.js';
import PointOfferView from '../view/point-offer-view.js';
import PointView from '../view/point-view.js';

/**
 * Презентер для маршрута со списком точек остановки
 */
export default class RoutePresenter {
  constructor() {
    this.model = new PointsModel();
    this.pointEditorView = new PointEditorView();
  }

  /**
  * Создает DOM-элемент оффера
  * @param {Object} offer
  * @returns {PointOfferView}
  */
  createPointOfferView(offer) {
    return new PointOfferView()
      .setTitle(offer.title)
      .setPrice(offer.price);
  }

  /**
   * Создает массив с DOM-элементами офферов
   * @param {Object[]} offers
   * @return {PointOfferView[]}
   */
  createPointOfferViews(offers) {
    return offers.map(this.createPointOfferView);
  }

  /**
   * Создает DOM-элемент точки маршрута
   * @param {Object} point
   * @returns {PointView}
   */
  createPointView(point) {
    const pointView = new PointView();
    const title = `${point.type} ${point.destination.name}`;
    const dateForHuman = formatDate(point.dateFrom, 'MMM D');
    const dateForMachine = formatDate(point.dateFrom, 'YYYY-MM-DD');
    const startTimeForHuman = formatDate(point.dateFrom, 'HH:mm');
    const startTimeForMachine = formatDate(point.dateFrom, 'YYYY-MM-[DD]T[HH]:mm');
    const endTimeForHuman = formatDate(point.dateTo, 'HH:mm');
    const endTimeForMachine = formatDate(point.dateTo, 'YYYY-MM-[DD]T[HH]:mm');
    const offerElements = this.createPointOfferViews(point.offers);

    pointView
      .setTitle(title)
      .setIcon(point.type)
      .setDate(dateForHuman, dateForMachine)
      .setStartTime(startTimeForHuman, startTimeForMachine)
      .setEndTime(endTimeForHuman, endTimeForMachine)
      .setPrice(point.basePrice)
      .replaceOffers(offerElements);

    pointView.addEventListener('expand', (event) => {
      console.log('Показать редактор', event);
      this.pointEditorView.close();
      this.updatePointEditorView(point);
      this.pointEditorView.link(pointView).open();
    });

    return pointView;
  }

  /**
   * Создает DOM-элемент пункта списка типов
   * @param {string} type
   * @param {boolean} isChecked
   * @return {TypeListItemView}
   */
  createTypeListItemElement(type, isChecked = false) {
    const element = new TypeListItemView();
    const title = capitalizeFirstLetter(type);

    return element
      .setInput(type, isChecked)
      .setLabel(type, title);
  }

  /**
   * Создает список DOM-элементов для выпадающего списка типов
   * @param {string[]} types
   * @param {string} checkedType
   * @return {HTMLElement[]}
   */
  createTypeListItemElements(types, checkedType) {
    return types.map((type) => {
      const isChecked = (type === checkedType);
      return this.createTypeListItemElement(type, isChecked);
    });
  }

  /**
   * Создает DOM-элемент для переключателя оффера
   * @param {Object} offer
   * @param {boolean} isChecked
   * @param {string} type
   * @return {HTMLElement}
   */
  createOfferToggleView(offer, isChecked = false, type) {
    const element = new OfferSelectorView();

    return element
      .setInput(offer.id, type, isChecked)
      .setTitle(offer.title)
      .setPrice(offer.price);
  }

  /**
   * Создает массив с DOM-элементами всех переключателей офферов
   * @param {Object[]} checkedOffers
   * @param {string} type
   * @return {HTMLElement[]}
   */
  createOfferToggleViews(checkedOffers, type) {
    const offers = this.model.getOffersByType(type);

    return offers.map((offer) => {
      const isChecked = checkedOffers.find((checkedOffer) => (checkedOffer.id === offer.id));
      return this.createOfferToggleView(offer, Boolean(isChecked), type);
    });
  }

  /**
   * Создает форму редактирования точки
   * @param {AggregatedPoint} point
   */
  updatePointEditorView(point) {
    const typeListItems = this.createTypeListItemElements(POINT_TYPES, point.type);
    const typeTitle = capitalizeFirstLetter(point.type);
    const offerElements = this.createOfferToggleViews(point.offers, point.type);

    const startDate = formatDate(point.dateFrom, 'DD/MM/YY');
    const startTime = formatDate(point.dateFrom, 'HH:mm');
    const startDateTime = `${startDate} ${startTime}`;

    const endDate = formatDate(point.dateTo, 'DD/MM/YY');
    const endTime = formatDate(point.dateTo, 'HH:mm');
    const endDateTime = `${endDate} ${endTime}`;

    return this.pointEditorView
      .setIcon(point.type)
      .insertTypeList(typeListItems)
      .setTypeName(typeTitle)
      .setDestinationInput(point.destination.name)
      .setStartTime(startDateTime)
      .setEndTime(endDateTime)
      .setPrice(point.basePrice)
      .insertOffers(offerElements)
      .setDestinationDescription(point.destination.description);
  }

  /**
   * Отрисовывает все точки маршрута
   * @param {HTMLElement} containerElement
   */
  init(containerElement) {
    const pointsModel = new PointsModel();
    const points = pointsModel.get();
    const routeElement = new RouteView();
    const pointEditorElement = this.updatePointEditorView(points[0]);
    const fragment = document.createDocumentFragment();

    fragment.append(pointEditorElement);

    points.forEach((point) => {
      const pointElement = this.createPointView(point);

      fragment.append(pointElement);
    });

    routeElement.append(fragment);
    containerElement.append(routeElement);
  }
}
