var fs = require("fs");

// you can use fs.readFile
function readFile (filepath){
    // to implement
	return new Promise((resolve, reject) =>{
		fs.readFile(filepath, function(err, buff){

			if(err) reject(err);

			resolve(buff);
		})
	})
}

// testing the functionality
readFile("example-blob")
.then((result)=> console.log("File is " + result.length + " Bytes"))
.catch((error)=> console.log("Error while reading file"));
