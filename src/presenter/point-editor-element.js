import TypeListItemView from '../view/type-list-item-view.js';
import { capitalizeFirstLetter, getOffersByType, formatDate } from '../utils.js';
import OfferSelectorView from '../view/offer-selector-view.js';
import OffersModel from '../model/offers-model.js';
import PointEditorView from '../view/point-editor-view.js';
import {POINT_TYPES} from '../const.js';

/**
 * Создает DOM-элемент пункта списка типов
 * @param {string} type
 * @param {boolean} isChecked
 * @return {TypeListItemView}
 */
const createTypeListItemElement = (type, isChecked = false) => {
  const element = new TypeListItemView();
  const title = capitalizeFirstLetter(type);

  return element
    .setInput(type, isChecked)
    .setLabel(type, title);
};

/**
 * Создает список DOM-элементов для выпадающего списка типов
 * @param {string[]} types
 * @param {string} checkedType
 * @return {HTMLElement[]}
 */
const createTypeListItemElements = (types, checkedType) => types.map((type) => {
  const isChecked = (type === checkedType);
  return createTypeListItemElement(type, isChecked);
});

/**
 * Создает DOM-элемент для переключателя оффера
 * @param {Object} offer
 * @param {boolean} isChecked
 * @param {string} type
 * @return {HTMLElement}
 */
const createOfferSelectorElement = (offer, isChecked = false, type) => {
  const element = new OfferSelectorView();

  return element
    .setInput(offer.id, type, isChecked)
    .setTitle(offer.title)
    .setPrice(offer.price);
};

/**
 * Создает массив с DOM-элементами всех переключателей офферов
 * @param {Object[]} checkedOffers
 * @param {string} type
 * @return {HTMLElement[]}
 */
const createOfferSelectorElements = (checkedOffers, type) => {
  const offersModel = new OffersModel();
  const offerGroups = offersModel.get();
  const offers = getOffersByType(offerGroups, type);

  return offers.map((offer) => {
    const isChecked = checkedOffers.find((checkedOffer) => (checkedOffer.id === offer.id));
    return createOfferSelectorElement(offer, Boolean(isChecked), type);
  });
};

/**
 * Создает форму редактирования точки
 * @param {AggregatedPoint} point
 * @return {PointEditorView}
 */
export const createPointEditorElement = (point) => {
  const element = new PointEditorView();
  const typeListItems = createTypeListItemElements(POINT_TYPES, point.type);
  const typeTitle = capitalizeFirstLetter(point.type);
  const offerElements = createOfferSelectorElements(point.offers, point.type);

  const startDate = formatDate(point.dateFrom, 'DD/MM/YY');
  const startTime = formatDate(point.dateFrom, 'HH:mm');
  const startDateTime = `${startDate} ${startTime}`;

  const endDate = formatDate(point.dateTo, 'DD/MM/YY');
  const endTime = formatDate(point.dateTo, 'HH:mm');
  const endDateTime = `${endDate} ${endTime}`;


  return element
    .setIcon(point.type)
    .insertTypeList(typeListItems)
    .setTypeName(typeTitle)
    .setDestinationInput(point.destination.name)
    .setStartTime(startDateTime)
    .setEndTime(endDateTime)
    .setPrice(point.basePrice)
    .insertOffers(offerElements)
    .setDestinationDescription(point.destination.description);
};
