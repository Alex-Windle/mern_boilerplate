import React, { Component } from 'react';
import './App.css';
import RegisterOrder from './RegisterOrder'; 

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { 

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

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h5 className="App-title">Test</h5>
        </header>
        <RegisterOrder />
        <h5>Manage Orders</h5>
        <button onClick={this.editHandler}>Edit an Order</button>
        <button onClick={this.deleteHandler}>Delete Orders</button>
      </div>
    );
  }
}

export default App;