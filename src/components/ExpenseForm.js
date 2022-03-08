import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExpenseAction, confirmEditionAction } from '../actions';

class ExpenseForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  }

  componentDidUpdate(prevProps) {
    const { editingExpense } = this.props;
    if (Object.keys(prevProps.editingExpense).length === 0
    && Object.keys(editingExpense).length !== 0) {
      this.fillEditingExpenseData(editingExpense);
    }
  }

  fillEditingExpenseData = (editingExpense) => {
    const { value, description, currency, method, tag } = editingExpense;
    this.setState({
      value,
      description,
      currency,
      method,
      tag,
    });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { editingExpense } = this.props;
    if (Object.keys(editingExpense).length !== 0) {
      const { confirmEdition } = this.props;
      confirmEdition({ ...editingExpense, ...this.state });
    } else {
      const { addExpense } = this.props;
      addExpense(this.state);
    }
    this.setState({ value: '' });
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies, editingExpense } = this.props;

    return (
      <section>
        <form onSubmit={ this.handleSubmit }>
          <label htmlFor="value">
            Valor:
            <input
              type="number"
              name="value"
              id="value"
              value={ value }
              onChange={ this.handleChange }
              data-testid="value-input"
            />
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              type="text"
              name="description"
              id="description"
              value={ description }
              onChange={ this.handleChange }
              data-testid="description-input"
            />
          </label>
          <label htmlFor="currency">
            Moeda:
            <select
              name="currency"
              id="currency"
              value={ currency }
              onChange={ this.handleChange }
              data-testid="currency-input"
            >
              {currencies.map((curr) => <option key={ curr }>{curr}</option>)}
            </select>
          </label>
          <label htmlFor="method">
            Método de pagamento:
            <select
              name="method"
              id="method"
              value={ method }
              onChange={ this.handleChange }
              data-testid="method-input"
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Categoria:
            <select
              name="tag"
              id="tag"
              value={ tag }
              onChange={ this.handleChange }
              data-testid="tag-input"
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          <button type="submit">
            {editingExpense && Object.keys(editingExpense).length !== 0
              ? 'Editar despesa'
              : 'Adicionar despesa'}
          </button>
        </form>
      </section>
    );
  }
}

ExpenseForm.defaultProps = {
  editingExpense: {},
};

ExpenseForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  addExpense: PropTypes.func.isRequired,
  confirmEdition: PropTypes.func.isRequired,
  editingExpense: PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.string,
    description: PropTypes.string,
    currency: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
    exchangeRates: PropTypes.objectOf(PropTypes.object),
  }),
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  editingExpense: state.wallet.editingExpense,
});

const mapDispatchToProps = (dispatch) => ({
  addExpense: (expense) => dispatch(addExpenseAction(expense)),
  confirmEdition: (expense) => dispatch(confirmEditionAction(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
