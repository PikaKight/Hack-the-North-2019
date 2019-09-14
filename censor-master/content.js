var links = document.getElementsByTagName('a');
var titles = [];
var tagOrderMap = [];

for (var i = 0; i < links.length; i++) {
    if(links[i].href.includes("news.google.com/articles")){
        if(!links[i].href.includes("myaccount.google.com")){
            if(!links[i].href.includes("accounts.google.com")){
                if(links[i].innerText !== ""){
                    titles.push(links[i].innerText);
                    tagOrderMap.push(i);
                    console.log(links[i].innerText);
                }
            }
        }
    }
}

httpRequestsArr = [];
httpRequestsArr.length = titles.length;


function censorTag(j) {
    document.getElementById(tagOrderMap[j]).style.backgroundColor = "black";
}

function requestHandler(u, titles) {
    httpRequests = new XMLHttpRequest();
    httpRequests.open('POST', 'https://cors-anywhere.herokuapp.com/https://apis.paralleldots.com/v4/emotion', true);
    httpRequests.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    httpRequests.onload = function() {
        if (this.status >= 200 && this.status < 400) {
            console.log("Request " + u + ": " + this.response);
            console.log("Order of A" + tagOrderMap[u]);
            censorTag(u); // SMOL HACK
        }
    }
    httpRequests.send(`text=${titles[u]}&api_key=5pC6m1e0wOLBdkwtOcfzesFReIsbFy5fTDhhJHQoEnQ`);
}

for (i = 0; i < titles.length; i++) {
    requestHandler(i, titles);
}


