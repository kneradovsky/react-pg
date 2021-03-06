let backendBase = "http://localhost:30981/";
if(process.env.NODE_ENV === 'production') 
	backendBase = "/";
const urls = {
	baseUrl : backendBase,
	mcccodes : backendBase+"dictionaries/mccodes",
	currencies: backendBase+"dictionaries/currencies",
	parameters : backendBase+"data/parameters",
	paramtmpls : backendBase+"data/parameterTemplates",
	transactions: backendBase+"data/transactions",
	transactionsets: backendBase+"data/transactions",
	cards : backendBase+"data/cards",
	tariffs : backendBase+"dictionaries/tariff",
	cardrules: backendBase+"data/cardrules",
	cardrules_validate: backendBase+"data/cardrules/validate",
	countries: backendBase+"dictionaries/countries"
};

export default urls;