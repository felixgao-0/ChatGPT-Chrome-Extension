async function callApi() 
{
  await fetch(getUrl(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('apiKey')}`
    },

    body: JSON.stringify(
      {'model': 'gpt-3.5-turbo',
        'messages': [
          {'role': 'assistant','content': "You are a helpful AI which should reply concisely. Avoid using markdown which affects text sizing, like #s, others you are free to use as needed."},
          {'role': 'user','content': document.getElementById("textArea").value}
        ],
      }
    )
  })
  .then(result => result.json())
  .then(response => {

  console.log(response)
  let node = document.createTextNode(response.choices[0].message.content);

  var converter = new showdown.Converter(),
    text      = response.choices[0].message.content,
    html      = converter.makeHtml(text);

  document.getElementById("response").textContent = '';
  document.getElementById("response").appendChild(converter);
  })
}

function getUrl()
{
  if (localStorage.getItem('useArcadeApi') == "true") { // Why true as a string? idk thats just how it is
    return "https://jamsapi.hackclub.dev/openai/chat/completions"
  } else {
    return "https://api.openai.com/v1/chat/completions"
  }
}


function saveKey()
{
    key = document.getElementById('keyInput').value;
    if (key != "") {
        localStorage.setItem('apiKey', key); 
        console.log("saved following apiKey: " + key);
    }
}


function saveKeyType() {
  var checkBox = document.getElementById("toggle-btn");

  if (checkBox.checked) {
    console.log("Saved useArcadeApi: true");
    localStorage.setItem('useArcadeApi', true);
  } else {
    console.log("Saved useArcadeApi: false");
    localStorage.setItem('useArcadeApi', false);
  }
}

// Return user settings on load
// Learned to wait until things load from my last project lol
document.addEventListener("DOMContentLoaded", (event) => {
  if (localStorage.getItem('useArcadeApi') == "true") { // Why true as a string? idk thats just how it is
    document.getElementById("toggle-btn").checked = true;
  } else {
    document.getElementById("toggle-btn").checked = false;
  }

  document.getElementById("ask-btn").addEventListener("click", callApi);
  document.getElementById("save-btn").addEventListener("click", saveKey);
  document.getElementById("toggle-btn").addEventListener("click", saveKeyType);

});