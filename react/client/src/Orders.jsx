import React, { Component } from 'react';

class Orders extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      customers: [] 
    }; 
  }

  componentDidMount() {
    fetch('/customers')
      .then(res => res.json())
      .then(obj => obj.customers)
      .then(arrayOfCustomers => this.setState({customers: arrayOfCustomers})) 
  }

  render() {
    return (
      <div>
        <h5>Orders</h5>
        {this.state.customers.map(customer => {
          return <div key={customer.firstname}>{customer.firstname} {customer.lastname}: {customer.order}</div> 
        })}
      </div>
    );
  }
}

export default Orders;