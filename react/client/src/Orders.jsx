import React, { Component } from 'react';

class Orders extends Component {

  render() {
    const customers = this.props.customers;
    const orderDisplayMessage = this.props.orderDisplayMessage;

    return (
      <div>
        <h5>Orders</h5>
        <p>{orderDisplayMessage}</p>
          {customers.map((customer) => {
            return <div key={customer.firstname + customer.lastname}>
              {customer.firstname} {customer.lastname} {customer.order}
            </div>
          })} 
      </div>
    );
  }
}

export default Orders;