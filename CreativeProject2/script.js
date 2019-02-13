document.getElementById("songSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  const value = document.getElementById("searchField").value;
  songValue = document.getElementById("searchFieldYear").value;
  songValue = songValue.replace(/ +/g,"%20");
  if (value === "")
    return;
  if (songValue == "")
    return;
  const url = "https://private-anon-8df9b8800f-lyricsovh.apiary-proxy.com/v1/" + value + "/" + songValue;
  fetch(url)
  .then(function(response) {
    return response.json();
  }).then(function(json) {
    let result = "";
    tempResult = json.lyrics;
    if(tempResult == undefined)
      result += "The song lyrics for this song are not currently available. Please choose a different song."
    else{
      tempResult = tempResult.replace(/\n/g,"<br>");
      tempResult = tempResult.replace(/"Paroles de la chanson "/g, "")
      result += tempResult;
    }

      document.getElementById("songResults").innerHTML = result;
  });

});
