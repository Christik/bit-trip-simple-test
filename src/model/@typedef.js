/** @typedef {import('./application-model').default} ApplicationModel */

/**
 * @template Item
 * @template {Adapter} ItemAdapter
 * @typedef {import('./collection-model').default<Item,ItemAdapter>} CollectionModel
 */

/**
 * @template Item
 * @template {Adapter} ItemAdapter
 * @typedef {import('./data-table-model').default<Item,ItemAdapter>} DataTableModel
 */

/**
 * @template {Adapter} ItemAdapter
 * @typedef {CustomEvent<ItemAdapter>} CollectionModelEvent
 */
