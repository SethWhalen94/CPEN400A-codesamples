//======================================
// Class activity: Slide 18
// Write code for request handler that issues an AJAX request
// everytime OK button is pressed and cancels the request every time
// CANCEL button is pressed. Print appropriate error messages if request
// times out (after 5s) and also if there is an error or the request is
// aborted.
// Periodically display messages that are "in-flight" from client to server
//=========================================================================

function requestCount(message, inFlight) {
	var count = 0; // keep track of messages sent

	var sendRequest = function() {
		var xhr = new XMLHttpRequest();
		var name = "XHR " + count;
		var index = 0;				// closure variable for removeFromList function
		xhr.open("GET", message + "-" + count);
		count += 1;

		var removeFromList = function () {
			index = inFlight.indexOf(xhr);
			if(index >=0) {
				inFlight.splice(index,1);	// remove request from inFlight array
			}
			else
				alert("Request " + name +" not in inFlight array!");
		}
		xhr.onload = function () {

			if (xhr.status === 200) {
				console.log("request " + name + " received response " + xhr.responseText);
			} else {
				console.log("request " + name + " received error code  " + xhr.status);
			}
			removeFromList();
		}
		xhr.onerror = function (err) {
			console.log("Request " + name + " had a network error: " + err);
			removeFromList();
		}
		xhr.onabort = function () {
			console.log("Request " + name + " was aborted");
			removeFromList();
		}
		xhr.ontimeout = function () {
			console.log("Request " + name +" timed out after " + xhr.timeout + "ms");
			removeFromList();
		}
		xhr.toString = function() {
			return name;
		};

		// All the handlers are setup, so send the message
		xhr.timeout = 5000;	 // Wait at most 5000 ms for a response
		console.log("Sending request " + xhr);
		inFlight.push(xhr);	 // Add it to the inflight messages list
		xhr.send();	// send the request
	}

	return sendRequest;
}

function abortRequest(inFlight) {
	return function () {
		if (inFlight.length > 0) {
			inFlight[inFlight.length - 1].abort();
		} else {
			alert("No messages in flight");
		}
	}
}

function displayInFlight(inFlight) {
	var messages = "In flight messages : ";

	for (let i = 0; i < inFlight.length; i++) {
		messages += " (" + inFlight[i] + ")";
	}
	console.log(messages);
}

window.onload = function () {
	var okBut = document.getElementById("OK");
	var cancelBut = document.getElementById("Cancel");
	var inFlight = [];			// Array of in flight requests

	okBut.addEventListener("click", requestCount("/hello", inFlight), false);
	cancelBut.addEventListener("click", abortRequest(inFlight));

	setInterval(displayInFlight, 1000, inFlight);
}