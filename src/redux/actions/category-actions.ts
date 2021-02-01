import store from '../store';

export enum CategoryActionType {
  SET_CATEGORIES = 'SET_CATEGORIES'
}

export const setCategories = (categories) => (
  store.dispatch({
    type: CategoryActionType.SET_CATEGORIES,
    payload: { categories }
  })
);

export const getCategories = () => store.getState().categories;
