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

httpRequests = [];
httpRequests.length = titles.length;

for (i = 0; i < titles.length; i++) {
    httpRequests[i] = new XMLHttpRequest();
    httpRequests[i].open('POST', 'https://cors-anywhere.herokuapp.com/https://apis.paralleldots.com/v4/emotion', true);
    httpRequests[i].setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    httpRequests[i].onload = function() {
        if (this.status >= 200 && this.status < 400) {
            console.log("Request number " + i.toString() + ": " + this.response);
        }
    }
    httpRequests[i].send(`text=${titles[i]}&api_key=5pC6m1e0wOLBdkwtOcfzesFReIsbFy5fTDhhJHQoEnQ`);
}


