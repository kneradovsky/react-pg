use strict;
module.exports=Currencies;

function Currency(icode,iname) {
	this.code=icode;
	this.name=iname;
	return this;
}

function Currencies() {
	this.c = [];
	c.push(new Currency(810,'RUR'));
	c.push(new Currency(840,'USD'));
	return this;
}