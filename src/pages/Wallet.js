import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import ExpenseForm from '../components/ExpenseForm';
import { setCurrenciesAction } from '../actions';
import ExpensesTable from '../components/ExpensesTable';

class Wallet extends React.Component {
  componentDidMount() {
    const { setCurrencies } = this.props;
    setCurrencies();
  }

  render() {
    return (
      <div>
        <Header />
        <h1>TrybeWallet</h1>
        <ExpenseForm />
        <ExpensesTable />
      </div>
    );
  }
}

Wallet.propTypes = {
  setCurrencies: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setCurrencies: () => dispatch(setCurrenciesAction()),
});

export default connect(null, mapDispatchToProps)(Wallet);
