import getExchangeRates from '../components/getExchangeRates';

export const USER_LOGIN = 'USER_LOGIN';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const SET_CURRENCIES = 'SET_CURRENCIES';

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
