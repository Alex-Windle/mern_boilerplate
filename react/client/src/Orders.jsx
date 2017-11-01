import React, { Component } from 'react';

class Orders extends Component {
  render() {
    const customers = this.props.customers;
    const orderDisplayMessage = this.props.orderDisplayMessage;

    return (
      <div>
        <h5>Orders</h5>
        <p>{orderDisplayMessage}</p>
          <div class="container">
            <div class="row">
              <div class="col-sm">
                1 of 3 columns
              </div>
              <div class="col-sm">
                2 of 3 columns
              </div>
              <div class="col-sm">
                3 of 3 columns
              </div>
            </div>
          </div>
      </div>
    );
  }
}

export default Orders;

// {customers.map((customer) => {
//             return key={customer.firstname + customer.lastname}
//             {customer.firstname} {customer.lastname} {customer.order}       })} 