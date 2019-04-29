var input = "";
var output = "";

function setInput(){
	input = document.getElementsByName("input")[0].value;
}

function normalizeInput() {
	input = input.toLowerCase();
	input = input.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
	input = input.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
}

function parseStringToArray() {
	normalizeInput();
	return input.split(" ");
}

function addLinks() {
	var words = parseStringToArray();
	var result = "";
	for (let word of words) {
		result += "<a href= \"https://en.wiktionary.org/wiki/" + word + "#Latin\" target=\"none\">" + word + "</a> ";
	}
	return result;
}

function setOutput() {
	output = addLinks();
	document.getElementById("output").innerHTML = output;
}

function convert(){
	setInput();
	setOutput();
}