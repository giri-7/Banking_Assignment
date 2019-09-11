import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class SideBar extends Component{

	state = {
		loanList: []
	}

	componentDidMount(){
		if(JSON.parse(localStorage.getItem('reduxState'))){
			this.setState({
				loanList: JSON.parse(localStorage.getItem('reduxState')).loan.loanDetails
			})
		}
	}

	componentWillReceiveProps(newProps){
		this.setState({
			loanList: newProps.loanDetails
		})
	}

	selectedLoanDetails(data){
		this.props.getBacktoLoan(data);
	}


	render(){
		return(
			<div className="sideBarContent">
			<p className="text-center">Loan History</p>
				{(this.state.loanList.map((loan, id) => {
					return(
						<div key={id} className="listContent" onClick={this.selectedLoanDetails.bind(this, loan)}>
							<p>Loan : {id + 1}</p>
							<p>Amount  :  {loan.amount}</p>
							<p>Duration : {loan.duration}</p>
							<p>Interest : {loan.interest}</p>
							<p>Monthly Pay : {loan.monthlyPay}</p>
						</div>
					);
				}))}
			</div>
		);
	}
}


function mapStateToProps(state){
  return{
  	loanDetails: state.loan.loanDetails
  }
}


function mapDispatchToprops(dispatch){
  return bindActionCreators({}, dispatch);
}



export default connect(mapStateToProps, mapDispatchToprops)(SideBar);