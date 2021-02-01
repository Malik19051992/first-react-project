import { Reducer } from 'redux';

import { CategoryActionType } from '../actions/category-actions';
import { initialState } from '../initial-state';

export const categoryReducer: Reducer = (state = initialState.categories, action) => {
  switch (action.type) {
    case CategoryActionType.SET_CATEGORIES:
      return action.payload.categories;
    default:
      return state;
  }
};