PROXY_URL = "http://localhost:9000/";


window.onload = function () {
        var links = document.getElementsByTagName('a');
        var titles = [];
        var tagOrderMap = [];
        var globalHeadlineBarrier = 0;

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
        globalHeadlineBarrier = i;


        function censorTag(j, sentimentData) {
            j.style.backgroundColor = "rgb(32, 33, 36)";
            j.style.transition = "all 0.3"; // TODO TEST DURATION
            $(j).parent().hover(function() {$(this).css("background-color", "rgb(32, 33, 36)")}, function() {$(this).css("background-color", "rgb(32, 33, 36)")});
            // j.setAttribute("onmouseover", "this.style.backgroundColor = null");
            // j.setAttribute("onmouseout", "this.style.backgroundColor = rgb(32, 33, 36)");
        }

        function requestHandler(u, titles) {
            httpRequests = new XMLHttpRequest();
            httpRequests.open('POST', PROXY_URL + 'https://apis.paralleldots.com/v4/emotion', true);
            httpRequests.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
            //httpRequests.setRequestHeader('Accept', 'application/json');
            httpRequests.onload = function() {
                if (this.status >= 200 && this.status < 400) {
                    console.log("Request " + u + ": " + this.response);
                    console.log(this.response);
                    if ((JSON.parse(this.response).emotion.Angry + JSON.parse(this.response).emotion.Sad + JSON.parse(this.response).emotion.Fear) > 0.6) {
                        censorTag(titles[u], this.response); // SMOL HACK
                    }
                }
            }

            var api_keys = ["5pC6m1e0wOLBdkwtOcfzesFReIsbFy5fTDhhJHQoEnQ", "LIjMokIVHOugoE2hZz05YnK4kEnbvWlSq8uSTuVDLhM", "vOI8Ghq3vZa5gMr1aD0Nx5AAtgIglE3DnEm9Emt49PM", "56XXL2sWgeHpLWcGbBfXxPsHVwctP34TnR1C2mgyXmE", "iDFzBUlrvxAUxSRlRBW3CW7yx31VVQZtI1xUrwduqhs", "aDcblb0XeBkQi7WewErefoawIDO7wCFAGDLXSnuZVb4", "hiygXuNBRbXmzCIbl6xKsRxIQkJECdB1VZqE43OYMxs", "p28cU33iBfqwFTJ87DADthrGT4dKtcovS6Ude5GHpGw", "hiYBuZYHjbUxjdLIwzjtfgXwMxhkbbz3K2jzon5CFlM"];
            var rand_key = api_keys[u % api_keys.length];  //api_keys[Math.round(Math.random(0, api_keys.length))]

            httpRequests.send(`text=${titles[u].innerText}&api_key=${rand_key}`);
            console.log("Key: " + rand_key);
        }

        for (i = 0; i < titles.length; i++) {
            requestHandler(i, titles);
        }

    }