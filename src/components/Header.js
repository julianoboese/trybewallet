import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

function Header(props) {
  const { email, total } = props;
  return (
    <div>
      <p data-testid="email-field">{ email }</p>
      <p data-testid="total-field">{total || 0}</p>
      <p data-testid="header-currency-field">BRL</p>
    </div>
  );
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  total: state.wallet.total,
});

export default connect(mapStateToProps)(Header);
