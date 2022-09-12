import View, {html} from './view.js';

export default class DestinationView extends View {
  constructor() {
    super(...arguments);

    this.classList.add('event__section', 'event__section--destination');

    this.photoContainerView = this.querySelector('.event__photos-container');
    this.photoListView = this.querySelector('.event__photos-tape');

    this.photoContainerView.remove();
  }

  /**
   * @override
   */
  createTemplate() {
    return html`
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description"></p>

      <div class="event__photos-container">
        <div class="event__photos-tape">
          <img class="event__photo" src="img/photos/1.jpg" alt="Event photo">
         </div>
      </div>
    `;
  }

  setDescription(description) {
    this.querySelector('.event__destination-description').textContent = description;

    return this;
  }

  /**
   * @param {[string, string][]} states
   */
  setPictures(states) {
    const views = states.map(([src, alt]) =>
      Object.assign(new Image(), { src, alt, className: 'event__photo' })
    );

    this.photoListView.replaceChildren(...views);
    this.append(this.photoContainerView);

    return this;
  }
}

customElements.define(String(DestinationView), DestinationView);
