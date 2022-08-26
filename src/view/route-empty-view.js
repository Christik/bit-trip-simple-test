import ComponentView, { html } from './component-view.js';

export default class RouteEmptyView extends ComponentView {
  /** @override */
  createTemplate() {
    return html`
      <p class="trip-events__msg">Click New Event to create your first point</p>
    `;
  }
}

customElements.define(String(RouteEmptyView), RouteEmptyView);
