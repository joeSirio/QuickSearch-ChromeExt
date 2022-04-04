let ctrlDown = false,
    ctrlKey = 17,
    cmdKey = 91,
    qKey = 81;

document.addEventListener('keydown', async function (e) {
    console.log('keydown: ' + e.key)

    if (e.keyCode == ctrlKey || e.keyCode == cmdKey)
        ctrlDown = true;

    if (e.keyCode == qKey && ctrlDown){
        let selectedText = window.getSelection().toString();

        chrome.runtime.sendMessage({text: selectedText}, (response)=> {
            console.log(response);

            removePopups();
            updatePopup(selectedText, response)
        });
    }
});

document.addEventListener('keyup', function(e){
    console.log('keyup')
    if (e.keyCode == ctrlKey || e.keyCode == cmdKey) ctrlDown = false;
})

function updatePopup(text, results){
    if (results == null) {
        console.log("google returned no search results");
        return false;
    }

    let newDiv = document.createElement('div');
    newDiv.setAttribute('class','quickSearchResultPopup');

    let formattedResults = ""
    for(let i = 0; i < results.length; i++){
        formattedResults += `
            <div class="result-item" style="border-top: 1px solid #ccc; padding: 25px 0; border-bottom: 1px solid #ccc;">
                <div class="result-title">${results[i].title}</div>
                <a href="${results[i].link}" class="result-link">${results[i].formattedUrl}</a>
                <div class="result-snippet">${results[i].snippet}</div>
            </div>
        `;
    }

    newDiv.innerHTML = `<div id="SelectedText" font-size:20px;>Searched Text: ${text} </div> 
        <div id="SelectedTextResults" style="overflow:auto;margin-top:25px;height:calc(100% - 50px);padding-bottom:25px;padding-right:10px"> ${formattedResults} </div>
        <div id="closeQuickSearchResultPopup" style="position:absolute; top:10px; right:10px; padding:5px; border:1px solid #ccc; border-radius:5px; cursor:pointer;">X</div>`;

    newDiv.style.cssText = 'position: fixed;' +
        'top: 25%;' +
        'left: 25%;' +
        'width: 50%;' +
        'height: 50%;' +
        'overflow: hidden;' +
        'z-index: 100;' +
        'background-color: rgb(32, 33, 36);' +
        'border: 1px solid #ccc;' +
        'padding: 25px 50px;' +
        'color:#bdc1c6;';

    document.body.appendChild(newDiv);

    document.getElementById('closeQuickSearchResultPopup').addEventListener('click', removePopups, {once: true})
}

function removePopups() {
    document.querySelectorAll(".quickSearchResultPopup").forEach(el => el.remove());
}