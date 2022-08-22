import ComponentView, {html} from './component-view.js';
import TypeOptionView from './type-option-view.js';

export default class TypeSelectView extends ComponentView {
  constructor() {
    super(...arguments);

    this.classList.add('event__type-wrapper');

    this.addEventListener('change', this.onChange);
  }

  /**
   * @override
   */
  createAdjacentHtml() {
    return html`
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>
          
        </fieldset>
      </div>
    `;
  }

  /**
   * @param {[string, PointType][]} states
   */
  setOptions(states) {
    const views = states.map((state) => new TypeOptionView(...state));

    this.querySelectorAll('legend ~ *').forEach((view) => view.remove());
    this.querySelector('legend').after(...views);

    return this;
  }

  /**
   * @param {PointType} type
   */
  select(type) {
    this.querySelector('img').src = `img/icons/${type}.png`;
    this.querySelector(`[value="${type}"]`).checked = true;

    return this.expand(false);
  }

  expand(flag = true) {
    this.querySelector('input').checked = flag;

    return this;
  }

  /**
   * @param {Event & {target: HTMLInputElement}} event
   */
  onChange(event) {
    const { type, value, checked } = event.target;

    if (type === 'checkbox') {
      this.dispatchEvent(
        new CustomEvent(':expand', {
          detail: checked
        })
      );

      return;
    }

    if (type === 'radio') {
      this.select(value).dispatchEvent(
        new CustomEvent(':change', {
          detail: value
        })
      );
    }
  }
}

customElements.define(String(TypeSelectView), TypeSelectView);
