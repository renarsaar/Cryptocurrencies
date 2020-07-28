import { useReducer, useEffect } from 'react';
import axios from 'axios';

const ACTIONS = {
  MAKE_REQUEST: 'MAKE_REQUEST',
  GET_DATA: 'GET_DATA',
  ERROR: 'ERROR',
};

const BASE_URL = 'https://cors-anywhere.herokuapp.com/https://api.nomics.com/v1/currencies/ticker?key=4b9ef3848d3b670d28ce19e1b092f128';

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.MAKE_REQUEST:
      return { loading: true, cryptoData: [] };

    case ACTIONS.GET_DATA:
      return { ...state, loading: false, cryptoData: action.payload.cryptodata };

    case ACTIONS.ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        cryptoData: [],
      };

    default:
      return state;
  }
}

export default function useFetchCharts(interval, currency) {
  const [state, dispatch] = useReducer(reducer, { cryptoData: [], loading: true });

  useEffect(() => {
    dispatch({ type: ACTIONS.MAKE_REQUEST });

    axios.get(BASE_URL, {
      params: {
        interval,
        ids: currency.length === 0 ? 'BTC' : `BTC, ${currency.join()}`,
        convert: 'EUR',
      },
    }).then((res) => {
      dispatch({ type: ACTIONS.GET_DATA, payload: { cryptodata: res.data } });
    }).catch((error) => {
      dispatch({ type: ACTIONS.ERROR, payload: { error } });
    });
  }, [interval, currency]);

  return state;
}
