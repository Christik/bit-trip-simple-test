import View from './view.js';

export * from './view.js';

export default class RadioGroupView extends View {
  get inputSelector() {
    return '[type="radio"]';
  }

  getValue() {
    /** @type {HTMLInputElement} */
    const inputCheckedView = this.querySelector(`${this.inputSelector}:checked`);

    if (inputCheckedView) {
      return inputCheckedView.value;
    }

    return null;
  }

  setValue(value) {
    /** @type {HTMLInputElement} */
    const inputView = this.querySelector(`${this.inputSelector}[value="${value}"]`);

    if (inputView) {
      inputView.checked = true;
    }

    return this;
  }

  /**
   * @param {boolean[]} flags
   */
  setOptionsDisabled(flags) {
    /** @type {NodeListOf<HTMLInputElement>} */
    const views = this.querySelectorAll(this.inputSelector);

    views.forEach((view, index) => (view.disabled = flags[index]));

    return this;
  }
}
