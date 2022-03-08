import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userLoginAction } from '../actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  }

  validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/igm;
    return emailRegex.test(email);
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { email } = this.state;
    const { userLogin, history } = this.props;
    userLogin(email);
    history.push('/carteira');
  }

  render() {
    const { email, password } = this.state;
    const minPasswordLength = 6;
    return (
      <form onSubmit={ this.handleSubmit }>
        <input
          type="email"
          name="email"
          placeholder="e-mail"
          value={ email }
          onChange={ this.handleChange }
          data-testid="email-input"
        />
        <input
          type="password"
          name="password"
          placeholder="senha"
          value={ password }
          onChange={ this.handleChange }
          data-testid="password-input"
        />
        <button
          type="submit"
          disabled={ !this.validateEmail(email) || password.length < minPasswordLength }
        >
          Entrar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  userLogin: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  userLogin: (email) => dispatch(userLoginAction(email)),
});

export default connect(null, mapDispatchToProps)(Login);
