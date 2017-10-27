import React, { Component } from 'react';

class Orders extends Component {
  constructor(props) {
    super(props);

    this.state = { 
    }; 
  }

  render() {
    const customers = this.props.customers; 
    console.log(customers);

    return (
      <div>
        <h5>Orders</h5>
         {customers.map(customer => {
           return <div key={customer.firstname}>{customer.firstname} {customer.lastname}: {customer.order}</div> 
         })}
      </div>
    );
  }
}

export default Orders;