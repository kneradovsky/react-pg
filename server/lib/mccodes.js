module.exports = MCC;

function Code(data) {
	var fields = ['mcc','tcc','cat_en','cat','subcat_en','subcat','desc_en','desc_rus']
	object = this;
	fields.forEach(function(item,i,arr) {
		object[item]=data[i].toString()
	})
	return this;
}
function MCC() {
	var fs = require('fs')
	var data = fs.readFileSync('mcccodes.csv').toString().split("\n");
	codes = []
	data.forEach(function(item,i,arr) { codes.push(new Code(item.toString().split(';')))})
	this.codes = codes
}