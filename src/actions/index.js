import getExchangeRates from '../services/getExchangeRates';

export const USER_LOGIN = 'USER_LOGIN';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const SET_CURRENCIES = 'SET_CURRENCIES';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const START_EDITION = 'START_EDITION';
export const CONFIRM_EDITION = 'CONFIRM_EDITION';

export const userLoginAction = (email) => ({
  type: USER_LOGIN,
  payload: { email },
});

export const setCurrenciesAction = () => async (dispatch) => {
  const exchangeRates = await getExchangeRates();
  dispatch({
    type: SET_CURRENCIES,
    payload: { currencies: Object.keys(exchangeRates)
      .filter((currency) => currency !== 'USDT') },
  });
};

export const addExpenseAction = (expense) => async (dispatch) => {
  const exchangeRates = await getExchangeRates();
  dispatch({
    type: ADD_EXPENSE,
    payload: { expense: { ...expense, exchangeRates } },
  });
};

export const deleteExpenseAction = (expense) => ({
  type: DELETE_EXPENSE,
  payload: { expense },
});

export const startEditionAction = (expense) => ({
  type: START_EDITION,
  payload: { expense },
});

export const confirmEditionAction = (expense) => ({
  type: CONFIRM_EDITION,
  payload: { expense },
});
