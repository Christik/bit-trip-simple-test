/**
 * @template Model
 * @template View
 */
export default class Presenter {
  /**
   * @param  {[model: Model, view: View]} args
   */
  constructor(...args) {
    const [model, view] = args;

    this.model = model;
    this.view = view;
  }
}
