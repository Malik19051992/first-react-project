import { LocalStorageUtils, LocalStorageItem } from './local-storage.utils';

export enum ViewMode {
  GRID = 'grid',
  LIST = 'list'
}

export class ViewModeUtils {
  static getViewMode(): ViewMode {
    let viewMode: ViewMode = LocalStorageUtils.get(LocalStorageItem.VIEW_MODE) as ViewMode;

    if (!viewMode) {
      viewMode = ViewMode.GRID;
      LocalStorageUtils.set(LocalStorageItem.VIEW_MODE, viewMode);
    }

    return viewMode;
  }

  static setViewMode(value: ViewMode) {
    LocalStorageUtils.set(LocalStorageItem.VIEW_MODE, value);
  }
}