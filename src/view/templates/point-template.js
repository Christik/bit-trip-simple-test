export const createPointTemplate = () => /*html*/ `
  <div class="event">
    <time class="event__date" datetime="2000-01-01">DEC 00</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/name.png" alt="Event type icon">
    </div>
    <h3 class="event__title">Type City</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="2000-01-01T00:00">00:00</time>
        &mdash;
        <time class="event__end-time" datetime="2000-01-01T00:00">00:00</time>
      </p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">0</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
    <div class="event__selected-offers">
    </div>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
`;
