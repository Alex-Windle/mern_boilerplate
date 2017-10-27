import React, { Component } from 'react';
import Orders from './Orders'; 

class RegisterOrder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstname: '', 
      lastname: '', 
      order: '',  
      customers: [] 
    }; 

    this.handleFirstnameChange = this.handleFirstnameChange.bind(this);
    this.handleLastnameChange = this.handleLastnameChange.bind(this);
    this.handleOrderChange = this.handleOrderChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch('/customers')
      .then(res => res.json())
      .then(obj => obj.customers)
      .then(arrayOfCustomers => this.setState({customers: arrayOfCustomers})) 
  }

  handleFirstnameChange(event) {
    this.setState({firstname: event.target.value}); 
  }

  handleLastnameChange(event) {
    this.setState({lastname: event.target.value}); 
  }

  handleOrderChange(event) {
    this.setState({order: event.target.value}); 
  }

  handleSubmit(event) {
    event.preventDefault(); 

    let body = JSON.stringify({ 
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      order: this.state.order 
    }); 

    fetch("/customers", {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: body
    })
      .then((customer) => customer.json())
  }

  render() {
    return (
      <div>
        <h5>Create an Order</h5>
          <form onSubmit={this.handleSubmit}>
            <label>
              <p>First name:</p>
              <input type="text" value={this.state.firstname} onChange={this.handleFirstnameChange} />
            </label><br />
            <label>
              <p>Last name:</p>
              <input type="text" value={this.state.lastname} onChange={this.handleLastnameChange} />
            </label><br />
            <label>
              <p>Order:</p>
              <input type="text" value={this.state.order} onChange={this.handleOrderChange} />
            </label><br /><br />
            <div>
              <input type="submit" value="Register" />
            </div>
          </form>
          <Orders customers={this.state.customers} />
      </div>
    );
  }
}

export default RegisterOrder;
