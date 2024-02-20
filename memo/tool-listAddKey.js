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
			    const list = listAddKey(struct);

				fs.writeFile(`list_with_key.json`, JSON.stringify(list, null, "\t"), err => {
				  if (err) {
				    console.error(err);
				  } else {
				  	console.log(list);
				  	console.log("Write as list_with_key.json")
				  }
				});
			});
			interface.close();
		});
    })
    .catch(err => {
        console.log(err)
    });

function listAddKey(inputObj){
	Object.keys(inputObj).forEach((id)=>{
		inputObj[id].k = parseKey(inputObj, id);
	});
	return inputObj;
}

function parseKey(struct, id, key=[]){
	const parent = struct[id].p;
	if(parent===null) return key;

	key.push(struct[parent].n);
	return parseKey(struct, parent, key);
}




