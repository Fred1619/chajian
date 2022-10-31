function gettaburl() {
    chrome.tabs.getSelected(null, function(tab) {
        let tempob = tab.url;
        console.log(tempob);
        localStorage.setItem("taburl", tempob);
    });
}
gettaburl();

function gettaburl2() {
    chrome.tabs.query({ currentWindow: true, active: true }, function(tabs) {
        console.log(tabs[0]);
    });
}