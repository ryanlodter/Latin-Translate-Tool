//input string
var input = "";

//gets input from the input field
function setInput(){
	input = document.getElementById("input").value;
}

//splits input into an array by lines
function separateLines(){
	return input.split("\n");
}

//normalizes a string by converting to lowercase, replacing dashes with spaces, removing accents, and removing punctuation
function normalize(line) {
	normalized = line;
	normalized = normalized.toLowerCase();
	normalized = normalized.replace('—', " ");
	normalized = normalized.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
	normalized = normalized.replace(/[.,?!\/#!$%\^&\*;:{}=\-_`'~()"\[\]]/g,"");
	return normalized;
}

//splits line into an array by spaces, checks for -ve, -ne, and -que endings and removes them, excluding exeptions
function normalizeAndParseToArray(line) {
	var result = normalize(line).split(" ");
	
	var exceptions = ["simulatque", "atque", "adque", "namque", "undique", "usque", "quisque", 
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

//returns boolean true if string contains a number
function hasNumber(string) {
  return /\d/.test(string);
}

//returns string with each word linked to latin area of wikitionary using the normalized version of the word
function addLinks() {
	var lines = separateLines();
	var result = "<pre id=\"formatedOutput\">";
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
			} else {
				result += originalWord + " ";
			}
		}
		result += "<br/>";
	}
	result += "</pre>";
	return result;
}

//updates html file to contain linked words
function setOutput() {
	var output = addLinks();
	document.getElementById("output").innerHTML = output;
}

//runs on input to text area
function convert(){
	setInput();
	setOutput();
}
