let ctrlDown = false,
    ctrlKey = 17,
    cmdKey = 91,
    qKey = 81;

chrome.storage.local.get('gqs_key', function(result){
    if(result.gqs_key !== undefined)
        qKey = result.gqs_key;
});

document.addEventListener('keydown', async function (e) {
    console.log('keydown: ' + e.key)

    if (e.keyCode == ctrlKey || e.keyCode == cmdKey)
        ctrlDown = true;

    if (e.keyCode == qKey && ctrlDown){
        let selectedText = window.getSelection().toString();

        chrome.runtime.sendMessage({text: selectedText}, (response)=> {
            console.log(response);
        });
    }
});

document.addEventListener('keyup', function(e){
    console.log('keyup')
    if (e.keyCode == ctrlKey || e.keyCode == cmdKey) ctrlDown = false;
})

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        if (request.keyCode !== undefined)
            qKey = request.keyCode;
        return true;
    }
);
