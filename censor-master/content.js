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

(function() {
    // Load the script
    var script = document.createElement("SCRIPT");
    script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js';
    script.type = 'text/javascript';
    script.onload = function() {
        var $ = window.jQuery;
        for (var i = 0; i < titles.length; ++i) {
            $.ajax({
                url: 'https://apis.paralleldots.com/v4/taxonomy',
                data: `text=${titles[i]}&api_key=5pC6m1e0wOLBdkwtOcfzesFReIsbFy5fTDhhJHQoEnQ`,
                type: 'POST',
                success: function (data) {
                alert(JSON.stringify(data));
                },
            })
        }
    };

    document.getElementsByTagName("head")[0].appendChild(script);
})();


