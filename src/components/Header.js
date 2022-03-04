import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

function Header(props) {
  const { email } = props;
  return (
    <div>
      <p data-testid="email-field">{ email }</p>
      <p data-testid="total-field">0</p>
      <p data-testid="header-currency-field">BRL</p>
    </div>
  );
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Header);
