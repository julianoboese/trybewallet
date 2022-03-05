import { ADD_EXPENSE, DELETE_EXPENSE, SET_CURRENCIES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  idCounter: 0,
};

const walletReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case SET_CURRENCIES:
    return ({
      ...state,
      currencies: payload,
    });
  case ADD_EXPENSE:
    payload.id = state.idCounter;

    return ({
      ...state,
      expenses: [...state.expenses, payload],
      idCounter: state.idCounter + 1,
    });
  case DELETE_EXPENSE:
    return ({
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== payload.id),
    });
  default:
    return state;
  }
};

export default walletReducer;
