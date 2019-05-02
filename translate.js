var input = "";
var normalizedList = [];

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
	normalized = normalized.replace(/[.,?!\/#!$%\^&\*;:{}=\-_`'~()"]/g,"");
	return normalized;
}

function normalizeAndParseToArray(line) {
	var result = normalize(line).split(" ");
	
	var exceptions = ["simulatque", "atque", "adque", "namque", "undique", "quisque", 
		"quaeque", "quodque", "cuiusque", "cujusque", "cuique", "quemque", 
		"quamque", "quidque", "quoque", "quaque", "quoque", "quique", "quaeque", 
		"quorumque", "quarumque", "quorumque", "quibusque", "quosque", "quasque", 
		"quaeque", "quibusque"];
	for (var i = 0; i < result.length; i++){
		var word = result[i];
		if (word.length > 2){
			var ending = word.substring(word.length -  2, word.length);
			if (ending === "ve" || ending === "ne"){
				result[i] = word.substring(0, word.length - 2);
			}
		}
		if(!exceptions.includes(word)){
			if(word.length > 3){
				var ending = word.substring(word.length - 3, word.length);
				if (ending === "que") {
					result[i] = word.substring(0, word.length - 3);
				}
			}
		}
	}
	return result;
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
				var address = "<a href= \"https://en.wiktionary.org/wiki/" + normalizedWord + "#Latin\" target=\"none\">" + originalWord + "</a> ";
				result += address;
				if(!normalizedList.includes(normalizedWord)){
					normalizedList.push(normalizedWord);
				}
			} else {
				result += originalWord + " ";
			}
		}
		result += "<br/>";
	}
	result += "</pre>";
	return result;
}

function createVocabList(){
	var result = "";
	normalizedList.sort();
	for (let i = 0; i < normalizedList.length; i++){
		var normalizedWord = normalizedList[i];
		if(!(normalizedWord == "")){
			result += "<li><a href= \"https://en.wiktionary.org/wiki/" + normalizedWord + "#Latin\" target=\"none\">" + normalizedWord + "</a></li>";
		}
	}
	return result;
}

function setOutput() {
	var output = addLinks();
	var vocab = createVocabList();
	document.getElementById("output").innerHTML = output;
	document.getElementById("vocab").innerHTML = vocab;
}

function convert(){
	setInput();
	setOutput();
}