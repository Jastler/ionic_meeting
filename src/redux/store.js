import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { routes } from './utils';
import * as actions from './types';

const initialState = {
  data: [],
  page: 0,
  canLoadMore: true,
};

const getReducer = (name) => (state = initialState, action) => {
  switch (action.type) {
    case actions[`SET_${name.toUpperCase()}`]:
      return {
        ...state,
        data: [...state.data, ...action.data],
        page: state.page + 1,
        canLoadMore: !!action.data.length,
      };
    default:
      return state;
  }
};

const reducers = {};

routes.forEach((element) => {
  reducers[element] = getReducer(element);
});

export const store = createStore(combineReducers(reducers), applyMiddleware(thunk, logger));
