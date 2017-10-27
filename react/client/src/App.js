import React, { Component } from 'react';
import './App.css';

class App extends Component {
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
    this.deleteHandler = this.deleteHandler.bind(this);
  }

  deleteHandler(event) {
    alert('click delete');

    event.preventDefault(); 

    fetch("/customers", {
      method: "delete"
    })
      // .then((res) => res.json())
      .then((res) => console.log(res));
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

    //update component to show new data in UI 
    //clear form fields
  }

  componentDidMount() {
    fetch('/customers')
      .then(res => res.json())
      .then(obj => obj.customers)
      .then(arrayOfCustomers => this.setState({customers: arrayOfCustomers})) 
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h5 className="App-title">Test</h5>
        </header>
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

        <h5>Orders</h5>
        {this.state.customers.map(customer => {
          return <div key={customer.firstname}>{customer.firstname} {customer.lastname}: {customer.order}</div> 
        })}

        <h6>Delete Orders</h6>
        <button onClick={this.deleteHandler}>Delete</button>
      </div>
    );
  }
}

export default App;
