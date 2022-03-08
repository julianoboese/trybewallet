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
      currencies: payload.currencies,
    });
  case ADD_EXPENSE:
    payload.expense.id = state.idCounter;

    return ({
      ...state,
      expenses: [...state.expenses, payload.expense],
      idCounter: state.idCounter + 1,
    });
  case DELETE_EXPENSE:
    return ({
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== payload.expense.id),
    });
  case START_EDITION:
    return ({
      ...state,
      editingExpense: payload.expense,
    });
  case CONFIRM_EDITION:
    return ({
      ...state,
      expenses: state.expenses.map((expense) => (
        expense.id === payload.expense.id ? payload.expense : expense
      )),
      editingExpense: {},
    });
  default:
    return state;
  }
};

export default walletReducer;
