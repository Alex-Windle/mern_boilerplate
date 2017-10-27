import React, { Component } from 'react';
import './App.css';
import RegisterOrder from './RegisterOrder'; 

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h5 className="App-title">Test</h5>
        </header>
        <RegisterOrder />
      </div>
    );
  }
}

export default App;