const fs = require('fs');
const readline = require('readline');
const interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

fs.promises.readdir(process.cwd())
    .then(filenames => {
		console.log("Current directory JSON filenames");
        console.log("================================");
        filenames.forEach(filename => {
            if(filename.endsWith("json")) console.log(filename);
        });
        console.log("================================");
        interface.question('\nreading structure file : ', filename => {
		    console.log(`\nreading...`);

		    fs.readFile(filename, function (err, data) {
			    if (err) throw err;
			    const struct = JSON.parse(data.toString());
			    const list = struct2list(struct);

				fs.writeFile(`list.json`, JSON.stringify(list, null, "\t"), err => {
				  if (err) {
				    console.error(err);
				  } else {
				  	console.log("Write as list.json")
				  }
				});
			});
			interface.close();
		});
    })
    .catch(err => {
        console.log(err)
    });

function struct2list(inputObj, parentId = null, outputObj = {}) {
    // Determine the root object to work with
    let struct = inputObj.hasOwnProperty('struct') ? inputObj.struct : inputObj;
    let info = Object.assign({}, struct);
    delete info.name;
    delete info.id;
    delete info.time;
    delete info.children;
    // Initialize the output object for the current id if it hasn't been initialized yet
    if (!outputObj.hasOwnProperty(struct.id)) {
        outputObj[struct.id] = { 
        	p: parentId,
        	n: struct.name,
        	k: [],
            t: struct.time,
        	...info
        };
    }

    // If the current node has children, process each child recursively
    if (struct.children && Array.isArray(struct.children)) {
        struct.children.forEach(child => {
            struct2list(child, struct.id, outputObj);
        });
    }

    return outputObj;
}




