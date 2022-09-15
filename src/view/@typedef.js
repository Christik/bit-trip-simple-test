/** @typedef {import('flatpickr/dist/types/instance').Instance} Calendar */
/** @typedef {import('flatpickr/dist/types/options').DateOption} CalendarDate */
/** @typedef {import('flatpickr/dist/types/options').Options} CalendarOptions */

/** @typedef {import('./filter-view').default} FilterView */
/** @typedef {import('./sort-view').default} SortView */
/** @typedef {import('./point-view').default} PointView */
/** @typedef {import('./editor-view').default} EditorView */
/** @typedef {import('./creator-view').default} CreatorView */
/** @typedef {import('./list-view').default} ListView */
/** @typedef {import('./offer-view').State} OfferState */

/**
 * @typedef PointState
 * @prop {number} id
 * @prop {string} startIsoDate
 * @prop {string} endIsoDate
 * @prop {string} startDate
 * @prop {string} title
 * @prop {string} icon
 * @prop {string} startTime
 * @prop {string} endTime
 * @prop {string} price
 * @prop {OfferState[]} offers
 */
