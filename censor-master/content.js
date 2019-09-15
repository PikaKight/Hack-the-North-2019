window.onload = function() {

var links = document.getElementsByTagName('a');
var titles = [];
var tagOrderMap = [];

for (var i = 0; i < links.length; i++) {
    if(links[i].href.includes("news.google.com/articles")){
        if(!links[i].href.includes("myaccount.google.com")){
            if(!links[i].href.includes("accounts.google.com")){
                if(links[i].innerText !== ""){
                    titles.push(links[i]);
                    console.log(links[i].innerText);
                }
            }
        }
    }
}


function censorTag(j, sentimentData) {
    j.style.backgroundColor = "rgb(32, 33, 36)";
    j.style.transition = "all 0.3"; // TODO TEST DURATION
    j.onmouseover = function() {j.style.backgroundColor = null}
    j.onmouseout = function() {j.style.backgroundColor = "rgb(32, 33, 36)"}
}

function requestHandler(u, titles) {
    httpRequests = new XMLHttpRequest();
    httpRequests.open('POST', 'https://cors-anywhere.herokuapp.com/https://apis.paralleldots.com/v4/emotion', true);
    httpRequests.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    httpRequests.onload = function() {
        if (this.status >= 200 && this.status < 400) {
            console.log("Request " + u + ": " + this.response);
            if ((JSON.parse(this.response).emotion.Angry + JSON.parse(this.response).emotion.Sad + JSON.parse(this.response).emotion.Fear) > 0.5) {
                censorTag(titles[u], this.response); // SMOL HACK
            }
        }
    }

    var api_keys = ["5pC6m1e0wOLBdkwtOcfzesFReIsbFy5fTDhhJHQoEnQ", "LIjMokIVHOugoE2hZz05YnK4kEnbvWlSq8uSTuVDLhM", "vOI8Ghq3vZa5gMr1aD0Nx5AAtgIglE3DnEm9Emt49PM", "56XXL2sWgeHpLWcGbBfXxPsHVwctP34TnR1C2mgyXmE", "iDFzBUlrvxAUxSRlRBW3CW7yx31VVQZtI1xUrwduqhs"];
    var rand_key = api_keys[Math.round(Math.random(0, api_keys.length))]

    httpRequests.send(`text=${titles[u].innerText}&api_key=${rand_key}`);
    console.log("Key: " + rand_key);
}

for (i = 0; i < titles.length; i++) {
    requestHandler(i, titles);
}

}