import React, { Component } from 'react';

class RegisterOrder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstname: '', 
      lastname: '', 
      order: '',  
    }; 

    this.handleFirstnameChange = this.handleFirstnameChange.bind(this);
    this.handleLastnameChange = this.handleLastnameChange.bind(this);
    this.handleOrderChange = this.handleOrderChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
        <h5>Register a Customer</h5>
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
            </label><br />
            <label>
              <input type="submit" value="Register" />
            </label>
          </form>
      </div>
    );
  }
}

export default RegisterOrder;
