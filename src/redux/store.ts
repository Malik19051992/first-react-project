import { createStore } from 'redux';

import { categoryReducer } from './reducers/category-reducer';

const store = createStore(categoryReducer );

export default store;