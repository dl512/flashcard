var request = new XMLHttpRequest();
request.open("GET", "vocab.csv", false);
request.send(null);

var csvData = new Array();
var jsonObject = request.responseText.split(/\r?\n|\r/);
for (var i = 1; i < jsonObject.length; i++) {
  csvData.push(jsonObject[i].match(/(".*?"|[^",]+)(?=,|$)/g));
}

var randNum;
var batchNum = 10;
var batch = new Array();
var pointer = -1;

function reshuffle() {
  var i = 0;
  batch = new Array();
  while (i < batchNum) {
    randNum = Math.floor(Math.random() * csvData.length);
    if (batch.includes(randNum) == false) {
      batch.push(randNum);
      i = i + 1;
    }
  }
}

function showMeaning() {
  $(".meaning").html(
    "<p>" +
      csvData[batch[pointer]][1] +
      "</p>" +
      "<p>" +
      csvData[batch[pointer]][2] +
      "</p>" +
      "<p>" +
      csvData[batch[pointer]][3] +
      "</p>"
  );
}

function showNextWord() {
  pointer = (pointer + 1) % batchNum;
  $(".word").text(csvData[batch[pointer]][0]);
  $(".meaning").html("");
}

$(".show").on("click", function () {
  showMeaning();
});

$(".next").on("click", function () {
  showNextWord();
});

$(".reshuffle").on("click", function () {
  reshuffle();
  $(".reshuffle").text("Next " + batchNum);
  showNextWord();
});
