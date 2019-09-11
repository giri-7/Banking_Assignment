import React, {Component} from 'react';
import axios from 'axios';
 import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import SideBar from './components/SideBar';
import './App.css';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {sendloanAmount} from './actions/index';

class App extends Component {
  constructor(props){
     super(props);
      this.state={
        toggleSidebar: false,
        loanDetails: {
        loanAmount: 500,
        loanDuration: 0,
        },
        errors: {},

        monthlyPayment: "",
        intrestPay: ""
      }
  }

  toggleSideBar(){
    this.setState({
      toggleSidebar: !this.state.toggleSidebar
    })
  }

  handleChange(inputProps, e){
    let event = this.state.loanDetails;
    event[inputProps] = e.target.value;        
    this.setState({
      event
    }, () => {
      this.getDetails();
    })
  }


  getDetails(){
      if(this.state.loanDetails.loanAmount && (this.state.loanDetails.loanDuration >= 6 && this.state.loanDetails.loanDuration <= 24) ){
          axios.get(`https://ftl-frontend-test.herokuapp.com/interest?amount=`+ this.state.loanDetails.loanAmount +`&numMonths=` + this.state.loanDetails.loanDuration)
          .then(response => {
            this.setState({
                monthlyPayment: response.data.monthlyPayment.amount,
                intrestPay: response.data.interestRate
            })
          })
          .catch(error => {
            console.log(error.response)
          })
          let errors = {};
          errors['loanDuration'] = ''
          this.setState({
            errors: errors
          })
        }else{
          let errors = {};
          errors['loanDuration'] = 'Month Duration should be within 6 to 24.'
          this.setState({
            errors: errors
          })
        }
  }

  saveLoanAmount(e){
    e.preventDefault();
    if(this.state.loanDetails.loanAmount && (this.state.loanDetails.loanDuration >= 6 && this.state.loanDetails.loanDuration <= 24) ){
          let loanDetailsObj = {};
          loanDetailsObj['amount'] = this.state.loanDetails.loanAmount;
          loanDetailsObj['duration'] = this.state.loanDetails.loanDuration;
          loanDetailsObj['monthlyPay'] = this.state.monthlyPayment;
          loanDetailsObj['interest'] = this.state.intrestPay;
          this.props.sendloanAmount(loanDetailsObj);
    }

  }

  clearDetails(e){
    e.preventDefault();
    this.setState({
      loanDetails: {loanAmount: 500, loanDuration: 0},
      errors: {},
      monthlyPayment: "",
      intrestPay: ""
    })
  }

  showDetails(data){
    this.state.loanDetails['loanAmount'] = data.amount;
    this.state.loanDetails['loanDuration'] = data.duration;
    this.setState({
      loanDetails: this.state.loanDetails
    }, () => {
       this.getDetails();
    })
  }


  render(){
  const {toggleSidebar} = this.state;
  return(
      <div>
        <div className="wrapper">
          <nav className={(toggleSidebar === true) ? "sideMenuCls" : "collapseSideBar" }>
            <SideBar getBacktoLoan={this.showDetails.bind(this)} />
          </nav>
          <div className="content">
            <div>
              <button type="button" onClick={this.toggleSideBar.bind(this)} className="btn sidebarCollapse" style={{color: "#138496", background: "none"}}>
                <i className="fas fa-align-left"></i>
                <span>☰</span>
              </button>
              <div className="navBarSection p-2">
              <h1 className="text-center mb-5">Loan Calculator</h1>
                <form className="container" onSubmit={this.saveLoanAmount.bind(this)}>
                  <div className="form-group row">
                      <label htmlFor="loanAmount" className="col-12 col-sm-3 col-md-3 col-lg-3">Loan Amount</label>
                      <input type="number"
                          value={this.state.loanDetails.loanAmount}
                          onChange={this.handleChange.bind(this, 'loanAmount')}
                          className="form-control col-12 col-sm-5 col-md-5 col-lg-5"
                          placeholder="Enter Loan Amount"/>
                       
                        <div className="col-12 col-sm-4 col-md-4 col-lg-4">
                          <input className="range" type="range"
                           value={this.state.loanDetails.loanAmount}
                           min="500"
                           max="5000"
                           step="1"
                           onChange={this.handleChange.bind(this, 'loanAmount')}
                          />
                          <span className="output">{this.state.loanAmount} 500$ - 5k$</span>
                        </div>
                      </div>

                      <div className="form-group row">
                        <label htmlFor="loanDuration" className="col-12 col-sm-3 col-md-3 col-lg-3">Loan Duration</label>
                        <div className="col-12 col-sm-5 col-md-5 col-lg-5 p-0">
                          <input type="number"
                              value={this.state.loanDetails.loanDuration}
                              onChange={this.handleChange.bind(this, 'loanDuration')}
                              className="form-control "
                              placeholder="Enter Loan Duration"/>
                          <span className="error-text">{this.state.errors['loanDuration']}</span>
                        </div>
                        <div className="col-12 col-sm-4 col-md-4 col-lg-4">
                          <span className="output">6 - 24 Months</span>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label htmlFor="interestRates" className="col-12 col-sm-3 col-md-3 col-lg-3">Interest Rates</label>
                        <label className="form-control col-12 col-sm-5 col-md-5 col-lg-5">{(this.state.intrestPay === "") ? <Loader type="Circles" color="#e3e3e3" height={30} width={30}/> : this.state.intrestPay  }</label>
                        <div className="col-12 col-sm-4 col-md-4 col-lg-4">
                          <span className="output">Intrest of Pay</span>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label htmlFor="monthlyPayment" className="col-12 col-sm-3 col-md-3 col-lg-3">Monthly Payment</label>
                        <label className="form-control col-12 col-sm-5 col-md-5 col-lg-5">{(this.state.monthlyPayment === "") ? <Loader type="Circles" color="#e3e3e3" height={30} width={30}/> : this.state.monthlyPayment  }</label>
                        <div className="col-12 col-sm-4 col-md-4 col-lg-4">
                        <span className="output">6 - 24 Months</span>
                      </div>
                      </div>
                      <button type="submit" className="btn btn-primary  mr-3">Submit</button>
                      <button className="btn btn-warning" onClick={this.clearDetails.bind(this)}>Clear</button>
                </form>
              </div>
            </div>  
          </div>
        </div>
      </div>
    );

 }
}

function mapStateToProps(state){
  return{

  }
}


function mapDispatchToprops(dispatch){
  return bindActionCreators({sendloanAmount: sendloanAmount}, dispatch);
}



export default connect(mapStateToProps, mapDispatchToprops)(App);



