import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {customers: []}; 
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
          <h1 className="App-title">MERN Stack</h1>
        </header>
        <h1>Customers</h1>
        {this.state.customers.map(customer => {
          return <div>{customer.firstname} {customer.lastname}'s order is {customer.order}.</div>
        })}
      </div>
    );
  }
}

export default App;
