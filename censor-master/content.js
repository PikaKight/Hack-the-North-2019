var links = document.getElementsByTagName('a');
var titles = []

for (var i = 0; i < links.length; i++) {
    if(links[i].href.includes("news.google.com/articles")){
        if(!links[i].href.includes("myaccount.google.com")){
            if(!links[i].href.includes("accounts.google.com")){
                if(links[i].innerText !== ""){
                    titles.push(links[i].innerText);
                    console.log(links[i].innerText);
                }
            }
        }
    }
}


