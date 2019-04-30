var input = "";

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
	normalized = normalized.replace(/[.,?!\/#!$%\^&\*;:{}=\-_`~()"]/g,"");
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
	var result = "<pre id=\"formatedOutput\" style=\"width: 100%; white-space: pre-wrap;\">";
	for (let i = 0; i < lines.length; i++){
		curLine = lines[i];
		var originalWords = curLine.split(" ");
		var normalizedWords = normalizeAndParseToArray(curLine);
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
	result += "</pre>";
	return result;
}

function setOutput() {
	var output = addLinks();
	document.getElementById("output").innerHTML = output;
}

function convert(){
	setInput();
	setOutput();
}