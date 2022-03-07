import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpenseAction, startEditionAction } from '../actions';

class ExpensesTable extends Component {
  render() {
    const { expenses, deleteExpense, startEdition } = this.props;
    const tableFields = ['Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda',
      'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão', 'Editar/Excluir'];
    return (
      <table>
        <thead>
          <tr>
            {tableFields.map((field) => <th key={ field }>{field}</th>)}
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => {
            const { id, description, tag, method, value,
              exchangeRates, currency } = expense;

            return (
              <tr key={ id }>
                <td>{description}</td>
                <td>{tag}</td>
                <td>{method}</td>
                <td>{parseFloat(value).toFixed(2)}</td>
                <td>{exchangeRates[currency].name}</td>
                <td>{parseFloat(exchangeRates[currency].ask).toFixed(2)}</td>
                <td>{(value * parseFloat(exchangeRates[currency].ask)).toFixed(2)}</td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    onClick={ () => startEdition(expense) }
                    data-testid="edit-btn"
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={ () => deleteExpense(expense) }
                    data-testid="delete-btn"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      value: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      currency: PropTypes.string.isRequired,
      method: PropTypes.string.isRequired,
      tag: PropTypes.string.isRequired,
      exchangeRates: PropTypes.objectOf(PropTypes.object).isRequired,
    }),
  ).isRequired,
  deleteExpense: PropTypes.func.isRequired,
  startEdition: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (payload) => dispatch(deleteExpenseAction(payload)),
  startEdition: (payload) => dispatch(startEditionAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);
