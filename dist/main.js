(()=>{"use strict";class Searcher{constructor(e){this.databaseURL=e.databaseURL||"./database.json",this.fetch=(...e)=>window.fetch(...e),this.SHOW_NUM=40,this.readDatabase(this.databaseURL),this.initializeDOM(e.DOM),this.createEventListener()}readDatabase(e){this.fetch(e).then((e=>{if(e.ok)return e.json()})).then((e=>{this.database=e,this.TOTAL_NUM=Object.keys(e).length})).catch((e=>{console.error(e)}))}initializeDOM(e){this.dom={},this.dom.parent=e,this.dom.parent.classList.add("app"),this.dom.container=this.createAndAppendElement(e,"div",{class:"searcher-container"}),this.dom.seacher=this.createAndAppendElement(this.dom.container,"div",{class:"searcher"}),this.dom.input=this.createAndAppendElement(this.dom.seacher,"input",{class:"searcher-input",placeholder:"keywords..."}),this.dom.cardsContainer=this.createAndAppendElement(this.dom.container,"div",{class:"cards-container"}),this.dom.input.focus()}addMark(e,t){const a=new RegExp(t,"gi");return(e=e.replace(/(<mark>|<\/mark>)/gim,"")).replace(a,"<mark>$&</mark>")}createCard(e,t,a=null){const s=t.k.reverse().join("/"),r=this.createAndAppendElement(e,"a",{class:"card",href:"#"}),n=this.createAndAppendElement(r,"div",{class:"card-container"}),i=this.createAndAppendElement(n,"h4",{class:"card-title",innerText:`${t.n}`}),d=this.createAndAppendElement(n,"p",{class:"card-keys",innerText:`${s}`});return a&&(i.innerHTML=this.addMark(i.innerHTML,a),d.innerHTML=this.addMark(d.innerHTML,a)),r}createAndAppendElement(e,t,a={}){const s=document.createElement(t);return a.class&&(a.class.split(" ").forEach((e=>s.classList.add(e))),delete a.class),a.dataset&&(Object.keys(a.dataset).forEach((e=>s.dataset[e]=a.dataset[e])),delete a.dataset),Object.keys(a).forEach((e=>s[e]=a[e])),e.appendChild(s),s}search(e){const t=e.target.value.trim();if(!t)return void(this.dom.cardsContainer.innerHTML="");const a=document.createDocumentFragment(),s=Object.values(this.database);var r=1;for(let e of s)if(this.parseKeyword(t,e)&&(this.createCard(a,e,t),++r>=this.SHOW_NUM))break;this.dom.cardsContainer.innerHTML="",this.dom.cardsContainer.appendChild(a)}createEventListener(){this.dom.input&&this.search&&(this.search=this.search.bind(this),this.dom.input.addEventListener("input",this.search))}parseKeyword(e,t){const a=e.toLowerCase().split(","),s=a[0],r=(a[1],t.n||""),n=t.k||[];if(r.toLowerCase().includes(s))return!0;for(let e of n)if(e.toLowerCase().includes(s))return!0;return!1}}window.addEventListener("load",(e=>{window.searcher=new Searcher({DOM:document.querySelector("main")}),console.log(window.searcher)}))})();