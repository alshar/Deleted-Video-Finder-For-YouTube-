var contextMenuItem = {
    "id": "DVFYT context",
    "title": "Find Video",
    "contexts": ["link"],

};


chrome.contextMenus.create(contextMenuItem);


chrome.contextMenus.onClicked.addListener(function(clickData) {
    if (clickData.menuItemId === "DVFYT context"
        && clickData.linkUrl.includes("youtube.com/watch")) {

        var wayBackURL;
        let wayBackApi = 'https://archive.org/wayback/available?url=';
        let requestUrl = clickData.linkUrl;
        let googleSearchURl = 'https://www.google.com/search?q=' + clickData.linkUrl;

        $.getJSON(`${wayBackApi}${requestUrl}`, function(test){
            try {
                wayBackURL = test.archived_snapshots.closest.url ;
                chrome.tabs.create({url : wayBackURL});
                chrome.tabs.create( {url : googleSearchURl});
            } catch (exception) {
                alert("No WayBack Link Found :( \nOpening Google Search Link Instead")
                chrome.tabs.create( {url : googleSearchURl});
            }

        });


    }
});

//TODO read google branding guidelines and adjust accordingly

