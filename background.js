
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(sender.tab ?
        "from a content script:" + sender.tab.url :
        "from the extension");

    const key = 'AIzaSyDYqJxCrVt39FAGHlUsWzSl78HhUzhL600';
    const url = `https://www.googleapis.com/customsearch/v1?key=${key}&cx=017576662512468239146:omuauf_lfve&q=${request.text}`;

    fetch(url)
        .then(response => response.json())
        .then(response => sendResponse(response['items']))
        .catch();

    return true;
})
