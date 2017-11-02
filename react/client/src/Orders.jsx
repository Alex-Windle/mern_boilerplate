import React, { Component } from 'react';

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      editStatus: false,
      editFirstName: '', 
      editLastName: '', 
      editOrder: '', 
      customerId: ''
    };
    this.editFormHandler = this.editFormHandler.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitEdit = this.submitEdit.bind(this);
  }

  editFormHandler(id) {
    this.setState({ editStatus: true }); 
    console.log('CLICK: ', id);
    //kick off data fetch
    fetch('/customers')
      .then(res => res.json())
      .then(obj => obj.customers)
      
      //get customer by id
      .then((customers) => {
        for (var i=0; i<customers.length; i++) {
          if (customers[i]._id === id) {
            return customers[i];
          }
        }
      })
      .then((customer) => {
        this.setState({editFirstName: customer.firstname});
        this.setState({editLastName: customer.lastname});
        this.setState({editOrder: customer.order});
        this.setState({customerId: customer._id})
      })
      .then(() => {console.log('this.state= ', this.state)});

      //populate form. user edits info. 
      //resubmit information
      //kick off data fetch to display new customer order to UI 
  }

  handleChange(event) {
    console.log(event.target.value);
    console.log(event.target.name);
    // const name = event.target.name;
    // console.log(name);
    this.setState({[event.target.name]: event.target.value});
    // console.log(this.state);
  }

  submitEdit(e) {
    e.preventDefault();
    const id = this.state.customerId; 

    //create request body 
    const body = JSON.stringify({
      firstname: this.state.editFirstName, 
      lastname: this.state.editLastName, 
      order: this.state.editOrder
    });

    console.log('edit request body: ', body);
 
    //put request
    fetch(`/customers/${id}`, {
      method: "put", 
      headers: {
        'Accept': 'application/json', 
        'Content-Type': 'application/json'
      }, 
      body: body
    })
    .then((stuff) => {console.log('Complete Edit Request')})
    .then((res) => console.log(res));
    // .then((res) => {console.log('response from put request: ', res)});

    //pull database records
    // fetch('/customers') 
    //   .then(res => res.json())
    //   .then(obj => obj.customers)
    //   .then((customers) => {console.log(customers)})
  }

  render() {
    const customers = this.props.customers;
    const orderDisplayMessage = this.props.orderDisplayMessage;
    const date = this.props.date;
    const editStatus = this.state.editStatus;
    const editFirstName = this.state.editFirstName;
    const editLastName = this.state.editLastName;
    const editOrder = this.state.editOrder;

    if (!editStatus) {
      // console.log(customers);
      return (
        <div className="container">
          <h3 className="text-center">Orders</h3>
          <p className="text-center"><small>{orderDisplayMessage}{date}</small></p>
          <p className="text-center">NO EDIT</p>
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
                      <button onClick={() => {this.editFormHandler(id)}} className="btn btn-info">Edit</button>
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
    } else {
      // console.log(customers);
      return (
        <div className="container">
          <h3 className="text-center">Orders</h3>
          <p className="text-center"><small>{orderDisplayMessage}{date}</small></p>
          <div>
            OPEN MODAL
            <form onSubmit={this.submitEdit}>
              <input type="text"
                     name="editFirstName"  
                     value={editFirstName}
                     onChange={this.handleChange}
              />
              <input type="text"
                     name="editLastName" 
                     value={this.state.editLastName}
                     onChange={this.handleChange}
              />
              <input type="text"
                     name="editOrder" 
                     value={this.state.editOrder}
                     onChange={this.handleChange}
              />
              <input type="submit" value="Submit" className="btn btn-primary" />
            </form>
          </div>
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
                  return <tr key={customer._id}>
                    <td className="col-sm-4">
                      {customer.firstname} {customer.lastname}
                    </td>
                    <td className="col-sm-4">
                      {customer.order}
                    </td> 
                    <td className="col-sm-2">
                      <button onClick={() => {this.editFormHandler(id)}} className="btn btn-info">Edit</button>
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
}

export default Orders;