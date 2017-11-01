import React, { Component } from 'react';
import './App.css';
import RegisterOrder from './RegisterOrder'; 

class App extends Component {
  render() {
    return (
      <div>
        <header>
          <h1 className="text-center">Testing</h1>
        </header>
        <RegisterOrder />
      </div>
    );
  }
}

export default App;