import getExchangeRates from '../services/getExchangeRates';

export const USER_LOGIN = 'USER_LOGIN';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const SET_CURRENCIES = 'SET_CURRENCIES';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const START_EDITION = 'START_EDITION';
export const CONFIRM_EDITION = 'CONFIRM_EDITION';

export const userLoginAction = (payload) => ({
  type: USER_LOGIN,
  payload,
});

export const setCurrenciesAction = () => async (dispatch) => {
  const exchangeRates = await getExchangeRates();
  dispatch({
    type: SET_CURRENCIES,
    payload: Object.keys(exchangeRates).filter((currency) => currency !== 'USDT'),
  });
};

export const addExpenseAction = (payload) => async (dispatch) => {
  const exchangeRates = await getExchangeRates();
  dispatch({
    type: ADD_EXPENSE,
    payload: { ...payload, exchangeRates },
  });
};

export const deleteExpenseAction = (payload) => ({
  type: DELETE_EXPENSE,
  payload,
});

export const startEditionAction = (payload) => ({
  type: START_EDITION,
  payload,
});

export const confirmEditionAction = (payload) => ({
  type: CONFIRM_EDITION,
  payload,
});
