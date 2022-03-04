// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

export class ExpensesTable extends Component {
  render() {
    const tableFields = ['Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda',
      'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão', 'Editar/Excluir'];
    return (
      <table>
        <thead>
          <tr>
            {tableFields.map((field) => <th key={ field }>{field}</th>)}
          </tr>
        </thead>
      </table>
    );
  }
}

// const mapStateToProps = (state) => ({});

// const mapDispatchToProps = {};

export default connect()(ExpensesTable);
