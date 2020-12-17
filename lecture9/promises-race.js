// Example of promise.race

function valuePromise(value) {
	console.log("Creating valuePromise " + value);
	var r = Math.random();
	var delay = Math.random() * 5000;
	return new Promise( (resolve, reject) => {
		if(r>0.5)
			setTimeout(resolve, delay, value);
		else
			setTimeout(reject, delay, value);
		//var func = (r>0.5) ? resolve : reject;
		//setTimeout( func.bind(null, value), delay );
	});
};

var promises = []
var n = 5;
// Initialize the promises array with 'n' promises
for (var i=0; i<n; i++) {
	promises.push( valuePromise(i) );
}

// Wait for any of the promises to be resolved
var result = Promise.race( promises );

// Add a resolution function to get the values of each promise
result.then( (value) => {
	console.log( "Promise resolved : " + value );
} ).catch( (value) => {
	console.log( "Promise rejected : " + value );
});

console.log("End of program");

