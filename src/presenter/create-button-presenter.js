import Mode from '../enum/mode.js';
import Presenter from './presenter.js';

/**
 * @template {ApplicationModel} Model
 * @template {HTMLButtonElement} View
 * @extends Presenter<Model,View>
 */
export default class CreateButtonPresenter extends Presenter {
  /**
   * @param {[model: Model, view: View]} args
   */
  constructor(...args) {
    super(...args);

    this.view.addEventListener('click', () => {
      this.model.setMode(Mode.CREATE);
    });

    this.model.addEventListener(['view', 'create', 'edit'], () => {
      this.view.disabled = this.model.getMode() === Mode.CREATE;
    });
  }
}
