var input = "";
var output = "";
var normalizedInput = "";

function setInput(){
	input = document.getElementById("input").value;
}

function separateLines(){
	return input.split("\n");
}

function normalize(line) {
	normalized = line;
	normalized = normalized.toLowerCase();
	normalized = normalized.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
	normalized = normalized.replace(/[.,?!\/#!$%\^&\*;:{}=\-_`~()]/g,"");
	return normalized;
}

function normalizeAndParseToArray(line) {
	return normalize(line).split(" ");
}

function hasNumber(string) {
  return /\d/.test(string);
}

function addLinks() {
	var lines = separateLines();
	var result = "";
	for (let i = 0; i < lines.length; i++){
		var originalWords = lines[i].split(" ");
		var normalizedWords = normalizeAndParseToArray(lines[i]);
		for (let j = 0; j < originalWords.length; j++) {
			normalizedWord = normalizedWords[j];
			originalWord = originalWords[j];
			if (!hasNumber(normalizedWord)){
				result += "<a href= \"https://en.wiktionary.org/wiki/" + normalizedWord + "#Latin\" target=\"none\">" + originalWord + "</a> ";
			} else {
				result += originalWord + " ";
			}
		}
		result += "<br/>";
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