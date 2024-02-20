import hashlib
import json 

def md5(v): return hashlib.md5(v.encode("utf-8")).hexdigest()

sets = "abcdefghijklmnopqrstuvwxyz"
struct = {}

for t1 in sets:
	for t2 in sets:
		for t3 in sets:
			n = t1 + t2 + t3
			struct[md5(n)] = {"name":n}

with open("d.json", "w") as f: 
    json.dump(struct, f)