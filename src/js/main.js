import '../css/normalize.css';
import '../css/index.css';

window.addEventListener("load", (e)=>{
    window.fetch("./database.json")
        .then(response=>{
            if(response.ok) return response.json();
        }).then((data)=>{
            const DOM = document.querySelector("main");
            window.searcher = new Searcher(DOM, {
                database: data
            });
            console.log(window.searcher)
        }).catch((err)=>{
            console.error(err);
        }); 
});