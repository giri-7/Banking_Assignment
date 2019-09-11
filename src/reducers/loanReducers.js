const loanReducers = (state = {loanDetails: []}, action) => {
	switch(action.type){
		case "ADD_SAVE_LOAN":
		return {loanDetails: [...state.loanDetails.concat(action.payload)]};
		break;

		default:
		return state;
	}
}

export default loanReducers;