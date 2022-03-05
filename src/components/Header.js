import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

function Header(props) {
  const { email, expenses } = props;
  return (
    <div>
      <p data-testid="email-field">{ email }</p>
      <p data-testid="total-field">
        {expenses.reduce((acc, curr) => acc
          + (curr.value * parseFloat(curr.exchangeRates[curr.currency].ask)), 0)}

      </p>
      <p data-testid="header-currency-field">BRL</p>
    </div>
  );
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
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
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
