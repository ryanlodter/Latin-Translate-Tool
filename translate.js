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
	var result = [];
	var word = "";
	for (var i = 0; i < input.length; i++){
		var c = input.charAt(i);
		if (c == " " || c == ""){
			result.push(word);
			word = "";
		} else if (i == input.length - 1) {
			word += c;
			result.push(word);
			word = "";
		}
		else{
			word += c;
		}
	}
	return result;
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