
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    var newURL = `https://google.com/search?q=${request.text}`;
    chrome.tabs.create({url: newURL});
    return true;
})
