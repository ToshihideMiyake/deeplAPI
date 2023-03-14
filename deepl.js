const API_KEY = 'your deepl API KEY' ;
const API_URL = 'https://api-free.deepl.com/v2/translate';

function deeplTranslate() {
    let deeplInput=document.getElementById("deepl-input").value;
    let isJapanese=false;
    let sourceLang="";

    for(var i=0; i < deeplInput.length; i++){//言語判別
        if(deeplInput.charCodeAt(i) >= 256) {
        isJapanese = true;
        break;
        }
    }
    switch (isJapanese){
        case true:
         sourceLang='&source_lang=JA&target_lang=EN';
        break;
        case false:
         sourceLang='&source_lang=EN&target_lang=JA';
        break;
        default:
         alert("言語の判別に失敗しました");
    }
  let content = encodeURI('auth_key=' + API_KEY + '&text=' + deeplInput + sourceLang);
  let url = API_URL + '?' + content;

  fetch(url)
    .then(function(response) {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Could not reach the API: " + response.statusText);
        }
    }).then(function(data) {
        document.getElementById("deepl-output").value = data["translations"][0]["text"];
    }).catch(function(error) {
        alert("翻訳失敗");
    });
};
