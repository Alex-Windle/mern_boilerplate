import React, { Component } from 'react';

class Orders extends Component {
  render() {
    const customers = this.props.customers;
    const orderDisplayMessage = this.props.orderDisplayMessage;
    const date = this.props.date;
    return (
      <div className="container">
        <h3 className="text-center">Orders</h3>
        <p className="text-center"><small>{orderDisplayMessage}{date}</small></p>
          <table className="table">
            <thead>
              <tr>
                <th className="col-sm-4">
                  Customer
                </th>
                <th className="col-sm-4">
                  Order
                </th>
                <th className="col-sm-2">
                  Edit
                </th>
                <th className="col-sm-2">
                  Delete
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
                  <td className="col-sm-2">
                    button
                  </td>
                  <td className="col-sm-2">
                    button
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