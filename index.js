var request = new XMLHttpRequest();
request.open("GET", "vocab.csv", false);
request.send(null);

var csvData = new Array();
var jsonObject = request.responseText.split(/\r?\n|\r/);
for (var i = 1; i < jsonObject.length; i++) {
  csvData.push(jsonObject[i].match(/(".*?"|[^",]+)(?=,|$)/g));
}

var randNum = Math.floor(Math.random() * csvData.length);

$(".show").on("click", function () {
  $(".meaning").html(
    "<p>" +
      csvData[randNum][1] +
      "</p>" +
      "<p>" +
      csvData[randNum][2] +
      "</p>" +
      "<p>" +
      csvData[randNum][3] +
      "</p>"
  );
});

$(".next").on("click", function () {
  randNum = Math.floor(Math.random() * csvData.length);
  $(".word").text(csvData[randNum][0]);
  $(".meaning").html("");
});
