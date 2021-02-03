import * as _ from 'lodash';

export enum LocalStorageItem {
  VIEW_MODE = 'view_mode'
}

export class LocalStorageUtils {
  static set(key: LocalStorageItem, value: any): void {
    if (_.isObject(value) || _.isString(value)) {
      value = JSON.stringify(value);
    }

    if (_.isUndefined(value)) {
      value = null;
    }

    localStorage.setItem(key, value);
  }

  static get(key: LocalStorageItem): any {
    const item: string = localStorage.getItem(key);

    try {
      return JSON.parse(item);
    } catch (e) {
      return item;
    }
  }

  static delete(key: LocalStorageItem): void {
    localStorage.removeItem(key);
  }

  static keys(): LocalStorageItem[] {
    return Object.keys(localStorage) as  LocalStorageItem[];
  }

  static clear(): void {
    localStorage.clear();
  }
}
