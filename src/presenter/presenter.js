/**
 * @template Model
 * @template View
 */
export default class Presenter {
  /**
   * @param {[model: Model, view: View]} init
   */
  constructor(...init) {
    const [model, view] = init;

    this.model = model;
    this.view = view;
  }
}
