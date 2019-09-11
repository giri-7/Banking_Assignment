export function sendloanAmount(data){
	return{
		type: "ADD_SAVE_LOAN", payload: data
	};
}