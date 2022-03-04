import { ADD_EXPENSE, SET_CURRENCIES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  total: 0,
};

const walletReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case SET_CURRENCIES:
    return ({
      ...state,
      currencies: payload,
    });
  case ADD_EXPENSE:
    payload.id = state.expenses.length;
    return ({
      ...state,
      expenses: [...state.expenses, payload],
      total: payload.currency === 'BRL'
        ? state.total
          + parseFloat(payload.value)
        : state.total
          + (payload.value * parseFloat(payload.exchangeRates[payload.currency].ask)),
    });
  default:
    return state;
  }
};

export default walletReducer;
