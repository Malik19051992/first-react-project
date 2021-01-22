import { Reducer } from 'redux';

import { CategoryActionType } from '../actions/category-action';

export const categoryReducer: Reducer = (state = {}, action) => {
  switch (action.type) {
    case CategoryActionType.SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload.categories
      }
  }
};