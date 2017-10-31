import React, { Component } from 'react';
import Orders from './Orders'; 

class RegisterOrder extends Component {
  constructor(props) {
    super(props);
      this.state = {
        firstname: '', 
        lastname: '', 
        order: '',
        customers: [], 
        orderDisplayMessage: ''
      }; 
    this.deleteHandler = this.deleteHandler.bind(this);
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
      .then(() => {
        if (this.state.customers.length === 0) {
          this.setState({orderDisplayMessage: 'Add a new order.'})
        } else if (this.state.customers.length > 0) {
          this.setState({orderDisplayMessage: ''})
        }
      })
  }

  deleteHandler(event) {
    event.preventDefault(); 

    fetch("/customers", {
      method: "delete"
    })
      //update state
      .then(() => this.setState({firstname: '', lastname: '', order: ''}))
      .then(() => this.setState({customers: []}))
      .then(() => this.setState({orderDisplayMessage: 'All records deleted.'}));
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

    //save to database
    fetch("/customers", {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: body
    })

    //pull database records
    .then(fetch('/customers') 
      .then(res => res.json())
      .then(obj => obj.customers)
      //update state
      .then(arrayOfCustomers => this.setState({customers: arrayOfCustomers})) 
      //handle display message
      .then(() => {
        if (this.state.customers.length === 0) {
          this.setState({orderDisplayMessage: 'Add a new order.'})
        } else if (this.state.customers.length > 0) {
          this.setState({orderDisplayMessage: ''})
        }
      })
      //clear form
      .then(() => this.setState({firstname: '', lastname: '', order: ''}))
    )
  }

  render() {
    const customers = this.state.customers; 
    const orderDisplayMessage = this.state.orderDisplayMessage;
    const button = {fontSize: '2.3em',padding:'6px'};
    
    return (
      <div>
        <br /><br />
        <button onClick={this.deleteHandler}>Delete All Orders</button>
        <h5>New Order</h5>
          <form onSubmit={this.handleSubmit}>
            <label>
              First name: <input type="text" value={this.state.firstname} onChange={this.handleFirstnameChange} />
            </label><br /><br />
            <label>
              Last name: <input type="text" value={this.state.lastname} onChange={this.handleLastnameChange} />
            </label><br /><br />
            <label>
              Order: <input type="text" value={this.state.order} onChange={this.handleOrderChange} />
            </label><br /><br />
            <div>
              <input type="submit" value="Register" style={button} />
            </div>
          </form>
        <Orders orderDisplayMessage={orderDisplayMessage} customers={customers} />
      </div>
    );
  }
}

export default RegisterOrder;
