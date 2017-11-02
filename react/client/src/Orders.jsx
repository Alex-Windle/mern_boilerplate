import React, { Component } from 'react';

class Orders extends Component {
  constructor(props) {
    super(props);

    this.editHandler = this.editHandler.bind(this);
  }

  editHandler(id) {
    console.log('CLICK: ', id);
    //kick off data fetch
    fetch('/customers')
      .then(res => res.json())
      .then(obj => obj.customers)
      
      //get customer by id
      .then((array) => {
        for (var i=0; i<array.length; i++) {
          if (array[i]._id === id) {
            return array[i];
          }
        }
      })
      .then((item) => {console.log(item)});
    
    //populate form. user edits info. 
    //resubmit information
    //kick off data fetch to display new customer order to UI 
  }

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
                const id = customer._id; 
                // console.log(id);
                return <tr key={customer._id}>
                  <td className="col-sm-4">
                    {customer.firstname} {customer.lastname}
                  </td>
                  <td className="col-sm-4">
                    {customer.order}
                  </td> 
                  <td className="col-sm-2">
                    <button onClick={() => {this.editHandler(id)}} className="btn btn-info">Edit</button>
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