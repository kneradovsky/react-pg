const backendBase = "http://localhost:30981/";
const urls = {
	dictionaries : {
		mcccodes : backendBase+"dictionaries/mccodes",
		currencies: backendBase+"dictionaries/currencies"
	},
	parameters : backendBase+"data/parameters"

};

export default urls;