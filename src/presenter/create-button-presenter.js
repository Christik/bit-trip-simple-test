import Mode from '../enum/mode.js';
import Presenter from './presenter.js';

/**
 * @template {ApplicationModel} Model
 * @template {HTMLButtonElement} View
 * @extends {Presenter<Model,View>}
 */
export default class CreateButtonPresenter extends Presenter {
  /**
   * @param {[model: Model, view: View]} args
   */
  constructor(...args) {
    super(...args);

    this.view.addEventListener('click', this.onClick.bind(this));
    this.model.addEventListener('mode', this.onModeChange.bind(this));
  }

  onClick() {
    this.model.setMode(Mode.CREATE);
  }

  onModeChange() {
    this.view.disabled = (this.model.getMode() === Mode.CREATE);
  }
}
