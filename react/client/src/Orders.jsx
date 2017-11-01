import React, { Component } from 'react';

class Orders extends Component {
  render() {
    const customers = this.props.customers;
    const orderDisplayMessage = this.props.orderDisplayMessage;
    const date = this.props.date;
    return (
      <div className="container">
        <h3 className="text-center">Orders</h3>
        <p className="text-center">{orderDisplayMessage}{date}</p>
          <table className="table">
            <thead>
              <tr>
                <th className="col-sm-4">
                  Customer
                </th>
                <th className="col-sm-4">
                  Order
                </th>
              </tr>
            </thead>
            <tbody>
            {customers.map((customer) => {
                return <tr key={customer.firstname + customer.lastname}>
                  <td className="col-sm-4">
                    {customer.firstname} {customer.lastname} 
                  </td>
                  <td className="col-sm-4">
                    {customer.order}
                  </td>
                </tr>      
              })
            } 
            </tbody>
          </table>
      </div>
    );
  }
}

export default Orders;