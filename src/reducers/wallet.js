import { ADD_EXPENSE, CONFIRM_EDITION, DELETE_EXPENSE,
  SET_CURRENCIES, START_EDITION } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  idCounter: 0,
  editingExpense: {},
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
  case START_EDITION:
    return ({
      ...state,
      editingExpense: payload,
    });
  case CONFIRM_EDITION:
    return ({
      ...state,
      expenses: state.expenses.map((expense) => (
        expense.id === payload.id ? payload : expense
      )),
      editingExpense: {},
    });
  default:
    return state;
  }
};

export default walletReducer;
