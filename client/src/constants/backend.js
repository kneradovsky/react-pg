const backendBase = "http://10.63.36.110:30981/";
const urls = {
	dictionaries : {
		mcccodes : backendBase+"dictionaries/mccodes",
		currencies: backendBase+"dictionaries/currencies"
	},
	parameters : backendBase+"data/parameters",
	transactions: backendBase+"data/transactions"

};

export default urls;