// const startTime = new Date();
// console.log(`Start time : ${startTime}`);
// ---
class Searcher {
	constructor(config){
		this.SHOW_NUM = 40;
		// ---
		this.fetch = (...args) => window.fetch(...args);
		// ---
		this.DOM_parent = config.DOM;
		this.DOM_parent.classList.add("app")
		this.databaseURL = config.databaseURL || "./database.json";
		this.createMainDOM(this.DOM_parent);
		this.readDataBase();
		this.createEventListener();
	}
	createMainDOM(parentNode){
		this.DOM_container = this.createAndAppendElement(parentNode, "div", {
			class: "searcher-container"
		});

		this.DOM_seacher = this.createAndAppendElement(this.DOM_container, "div", {
			class: "searcher"
		});

		this.DOM_input = this.createAndAppendElement(this.DOM_seacher, "input", {
			class: "searcher-input",
			placeholder: "keywords..."
		});

		this.DOM_cardsContainer = this.createAndAppendElement(this.DOM_container, "div", {
			class: "cards-container"
		});

		this.DOM_input.focus();
	}
	addMark(text, mark){
		const regex = new RegExp(mark, 'gi');
	    text = text.replace(/(<mark>|<\/mark>)/gim, '');
	    return text.replace(regex, '<mark>$&</mark>');
	}
	createCard(parentDOM, item, search=null){
		const url = item.k.reverse().join("/");

		const card = this.createAndAppendElement(parentDOM, "a", {
			class: "card",
			href: "#",
		});

		const card_container = this.createAndAppendElement(card, "div", {
			class: "card-container",
		});

		const title = this.createAndAppendElement(card_container, "h4", {
			class: "card-title",
			innerText: `${item.n}`,
		});

		const keys = this.createAndAppendElement(card_container, "p", {
			class: "card-keys",
			innerText: `${url}`,
		});

		if (search) {
		    title.innerHTML = this.addMark(title.innerHTML, search);
		    keys.innerHTML = this.addMark(keys.innerHTML, search);
		}

		return card;
	}
	createAndAppendElement(parent, tag, attributes = {}) {
	    const element = document.createElement(tag);

	    // class 
	    if (attributes.class) {
	        attributes.class.split(" ").forEach(className => element.classList.add(className));
	        delete attributes.class;  // delete class in attributes
	    }
	    // dataset
	    if (attributes.dataset) {
	        Object.keys(attributes.dataset).forEach(key => element.dataset[key] = attributes.dataset[key]);
	        delete attributes.dataset;  // delete dataset in attributes
	    }
	    // other attributes
	    Object.keys(attributes).forEach(key => element[key] = attributes[key]);

	    parent.appendChild(element);
	    return element;
	}
	readDataBase(){
		this.fetch(this.databaseURL).then(response=>{
			if(response.ok) return response.json();
		}).then((data)=>{
			this.database = data;
			this.TOTAL_NUM = Object.keys(data).length;
		}).catch((err)=>{
			console.error(err);
		});
	}
	search(e){
		const text = e.target.value.trim();
		if(!text){
			this.DOM_cardsContainer.innerHTML = "";
			return;
		}

		const fragment = document.createDocumentFragment();
		const items = Object.values(this.database);
		var n = 1;
		for(let item of items){
            if (this.parseKeyword(text, item)) {
            	this.createCard(fragment, item, text);
            	if(++n >= this.SHOW_NUM) break;
            }
        };

        this.DOM_cardsContainer.innerHTML = "";
        this.DOM_cardsContainer.appendChild(fragment);
	}
	createEventListener(){
		if(this.DOM_input && this.search){
			this.search = this.search.bind(this);
			this.DOM_input.addEventListener("input",this.search);
		}
	}
	parseKeyword(inputText, item){
		const texts = inputText.toLowerCase().split(",");
		const text1 = texts[0];
		const text2 = texts[1];
		// --- exist text 2
		// if(text2){
		// 	console.log(text2)
		// }
		// ---
		const title = item.n||"";
		const keys = item.k||[];
		if(title.toLowerCase().includes(text1)) return true;
		for(let key of keys){
			if(key.toLowerCase().includes(text1)) return true;
		}
		return false;
	}
}

window.addEventListener("load", (e)=>{
	window.searcher = new Searcher({
		DOM: document.querySelector("main"),
		databaseURL: null,
	});
	console.log(window.searcher);
})