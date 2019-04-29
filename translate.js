var input = "";
var output = "";
var normalizedInput = "";

function setInput(){
	input = document.getElementById("input").value;
}

function normalizeInput() {
	normalizedInput = input;
	normalizedInput = normalizedInput.toLowerCase();
	normalizedInput = normalizedInput.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
	normalizedInput = normalizedInput.replace(/[.,?!\/#!$%\^&\*;:{}=\-_`~()]/g,"");
}

function parseStringToArray() {
	normalizeInput();
	return normalizedInput.split(" ");
}

function addLinks() {
	var originalWords = input.split(" ");
	var normalizedWords = parseStringToArray();
	var result = "";
	for (let i = 0; i < originalWords.length; i++) {
		normalizedWord = normalizedWords[i];
		originalWord = originalWords[i];
		result += "<a href= \"https://en.wiktionary.org/wiki/" + normalizedWord + "#Latin\" target=\"none\">" + originalWord + "</a> ";
	}
	return result;
}

function setOutput() {
	output = addLinks();
	document.getElementById("formatedOutput").innerHTML = output;
}

function convert(){
	setInput();
	setOutput();
}