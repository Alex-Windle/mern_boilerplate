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
        orderDisplayMessage: '',
        date: ''
      }; 
    this.deleteHandler = this.deleteHandler.bind(this);
    this.handleFirstnameChange = this.handleFirstnameChange.bind(this);
    this.handleLastnameChange = this.handleLastnameChange.bind(this);
    this.handleOrderChange = this.handleOrderChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetFormHandler = this.resetFormHandler.bind(this);
  }

  componentDidMount() {
    fetch('/customers')
      .then(res => res.json())
      .then(obj => obj.customers)
      .then(arrayOfCustomers => this.setState({customers: arrayOfCustomers})) 
      .then(() => {
        if (this.state.customers.length > 0) {
          this.setState({orderDisplayMessage: ''})
        }
      })
  }

  deleteHandler(event) {
    event.preventDefault(); 

    let date = function () {
      const currentDate = new Date(); 
      const month = currentDate.getMonth();
      const date = currentDate.getDate(); 
      const year = currentDate.getFullYear();
      const hour = currentDate.getHours(); 
      let min = currentDate.getMinutes();
      if (min.toString().length === 1) { min = "0" + min }
      return month + "/" + date + "/" + year + " at " + hour + ":" + min + ".";
    }(); 

    if (date) { 
      this.setState({date: date});
    };

    fetch("/customers", {
      method: "delete"
    })
      //update state
      .then(() => this.setState({firstname: '', lastname: '', order: ''}))
      .then(() => this.setState({customers: []}))
      .then(() => this.setState({orderDisplayMessage: 'All records deleted '})) 
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
      //clear display message and date
      .then(() => {
          this.setState({orderDisplayMessage: ''});
          this.setState({date: ''})
      })
      //reset form
      .then(() => this.setState({firstname: '', lastname: '', order: ''}))
    )
  }

  resetFormHandler () {
    this.setState({firstname: '', lastname: '', order: ''}); 
  }

  render() {
    const customers = this.state.customers; 
    const orderDisplayMessage = this.state.orderDisplayMessage;
    const date = this.state.date;
    return (
      <div>
        <h3 className="text-center">Order Form</h3>
        <form onSubmit={this.handleSubmit} className="container">
          <div className="row">
            <label className="col-sm-6">
              First name: 
              <input type="text" 
                     value={this.state.firstname} 
                     onChange={this.handleFirstnameChange} 
                     className="form-control form-control-lg"
                     />
            </label>
            <label className="col-sm-6">
              Last name: 
              <input type="text" 
                     value={this.state.lastname} 
                     onChange={this.handleLastnameChange} 
                     className="form-control form-control-lg"
                     />
            </label>
          </div>
          <div className="row">
            <label className="col-sm-12">
              Order: 
              <input type="text" 
                     value={this.state.order} 
                     onChange={this.handleOrderChange} 
                     className="form-control form-control-lg"
                     />
            </label>
          </div>
          <div className="btn-toolbar justify-content-between" role="toolbar">
            <div className="btn-group" role="group">
              <input type="submit" value="Register" className="btn btn-primary" />
              <button onClick={this.resetFormHandler} type="button" className="btn">Reset Form</button>
            </div>
            <div className="btn-group" role="group">
              <button type="button" className="btn btn-danger" onClick={this.deleteHandler}>Delete All Orders</button>
            </div>
          </div>
        </form>    
        <Orders orderDisplayMessage={orderDisplayMessage} date={date} customers={customers} />
      </div>
    );
  }
}

export default RegisterOrder;