import '../css/normalize.css';
import '../css/index.css';

import {Searcher} from './Searcher.js';

window.addEventListener("load", (e)=>{
	window.searcher = new Searcher({
		DOM: document.querySelector("main")
	});
	console.log(window.searcher);
});


