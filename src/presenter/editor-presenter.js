import Mode from '../enum/mode.js';
import CreatorPresenter from './creator-presenter.js';
import PointView from '../view/point-view.js';

/**
 * @template {ApplicationModel} Model
 * @template {EditorView} View
 * @extends {CreatorPresenter<Model,View>}
 */
export default class EditorPresenter extends CreatorPresenter {
  /**
   * @override
   */
  saveActivePoint() {
    return this.model.points.update(this.model.activePoint.id, this.activePoint);
  }

  deleteActivePoint() {
    return this.model.points.remove(this.model.activePoint.id);
  }

  /**
   * @override
   */
  onModelModeChange() {
    this.point = this.model.activePoint;

    if (this.model.getMode() === Mode.EDIT) {
      const pointView = PointView.findById(this.model.activePoint.id);

      this.view.close(true);
      this.updateView();
      this.view
        .target(pointView)
        .open();

      return;
    }

    if (this.model.getMode() === Mode.CREATE) {
      this.view.close(true);
    }
  }

  /**
   * @override
   * @param {Event} event
   */
  async onViewReset(event) {
    event.preventDefault();

    this.view.setDeleteButtonPressed(true);

    try {
      await this.deleteActivePoint();
      this.view.close();

    } catch (exception) {
      this.view.shake();
    }

    this.view.setDeleteButtonPressed(false);
  }
}
