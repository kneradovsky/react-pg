let backendBase = "http://localhost:30981/";
if(process.env.NODE_ENV === 'production') 
	backendBase = "/";
const urls = {
	dictionaries : {
		mcccodes : backendBase+"dictionaries/mccodes",
		currencies: backendBase+"dictionaries/currencies"
	},
	parameters : backendBase+"data/parameters",
	transactions: backendBase+"data/transactions",
	cards : backendBase+"data/cards",
	baseUrl : backendBase
};

export default urls;