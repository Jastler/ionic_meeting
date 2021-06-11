import axios from 'axios';
import * as actions from './types';

export const setData = (data, which) => ({
  type: actions[`SET_${which.toUpperCase()}`],
  data,
});

export function getData(route) {
  return (dispatch, getState) => {
    const state = getState();

    return axios.get(`https://api.hnpwa.com/v0/${route}/${state[route].page + 1}.json`)
      .then((response) => dispatch(setData(response.data, route)));
  };
}
