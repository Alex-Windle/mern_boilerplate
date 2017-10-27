import React, { Component } from 'react';
import './App.css';
import RegisterOrder from './RegisterOrder'; 

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      customers: [] 
    }; 

    this.deleteHandler = this.deleteHandler.bind(this);
  }

  deleteHandler(event) {
    alert('click delete');

    event.preventDefault(); 

    fetch("/customers", {
      method: "delete"
    })
      .then((res) => console.log(res));
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

        <RegisterOrder />
          
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
