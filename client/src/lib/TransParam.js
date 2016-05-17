export default class TransParamHelper {
	static necessaryDataIsProvidedToAddParam(settings) {
		return settings.type != "" 	&&
		settings.mcc !="" 		&&
		(settings.card != "" || settings.expression != "") 	&&
		settings.currency != "" &&
		settings.amount != "";
	}
}


