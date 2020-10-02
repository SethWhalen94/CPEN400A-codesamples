// Example for setTimeout and clearTimeout

var timeoutHandler = function(message) {
	return function( ) {
		alert(message);
	}
}

var log = function (name) {
	alert("Hello " + name);
}

s = undefined;

var setupTimeout = function( ) {
	s = setTimeout( log, 5000, "Seth" )
	console.log("Setup Handler");
}

var cancelTimeout = function( ) {
	if (s != undefined) {
		clearTimeout(s)
		alert("Timeout cleared")
	}
}

