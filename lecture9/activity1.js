// Prints the given ${time} after ${time} ms.
function resolveAfter(time){
    // to implement
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log("The time is "+ time);
			resolve(time);
		}, time);
	})
}

// Make the program print 500, 1000, 1500 
var first = resolveAfter(500)
.then(() => resolveAfter(1000))
.then(() => resolveAfter(1500));
