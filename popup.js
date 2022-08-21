document.addEventListener("DOMContentLoaded", function(event) {
    const hotkeyInput = document.getElementById("GqsHotkeyInput");
    const hotkeyReset = document.getElementById("GqsHotkeyReset");

    updateHotKeyInput();

    hotkeyInput.addEventListener("change", function(ev){
        console.log('input change');
        const keyCode = ev.target.value.toUpperCase().charCodeAt(0);
        updateHotKeyValueLocalStorage(keyCode);
    })

    hotkeyReset.addEventListener('click', function(ev){
        console.log('hotkey reset press')
        updateHotKeyValueLocalStorage(81);
        updateHotKeyInput();
    })
});

function updateHotKeyInput(){
    chrome.storage.local.get('gqs_key', function(result) {
        console.log('Value currently is ' + result.gqs_key);
        if(result.gqs_key !== undefined)
            document.getElementById("GqsHotkeyInput").value = String.fromCharCode(result.gqs_key);
    });
}

function updateHotKeyValueLocalStorage(keyCode){
    chrome.storage.local.set({gqs_key: keyCode}, function() {
        console.log('Value is set to ' + keyCode);
    });

    chrome.tabs.query({}, function(tabs) {
        tabs.forEach(function(tab){
            chrome.tabs.sendMessage(tab.id,
                {
                    keyCode: keyCode,
                }, function(response) {})
        })
    })
}