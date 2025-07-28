// Google Sheets configuration
const sheet_id = "1bgsvgUpJwJnJfokshBedtaiplF2DSdK3E_BEVz7EtiI";
const sheet_name = "1010305780";
const googleSheetsUrl = `https://docs.google.com/spreadsheets/d/${sheet_id}/export?format=csv&gid=${sheet_name}`;

var csvData = new Array();
var randNum;
var batchNum = 10;
var batch = new Array();
var pointer = -1;

// Load data from Google Sheets
async function loadDataFromGoogleSheets() {
  try {
    const response = await fetch(googleSheetsUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const csvText = await response.text();

    // Parse CSV data
    const jsonObject = csvText.split(/\r?\n|\r/);
    for (var i = 1; i < jsonObject.length; i++) {
      const row = jsonObject[i].match(/(".*?"|[^",]+)(?=,|$)/g);
      if (row && row.length > 0) {
        csvData.push(row);
      }
    }

    console.log(`Loaded ${csvData.length} vocabulary items from Google Sheets`);

    // Initialize the first batch after loading data
    reshuffle();
    showNextWord();
  } catch (error) {
    console.error("Error loading data from Google Sheets:", error);
    $(".word").text("Error loading data");
    $(".meaning").html(
      "<p>Failed to load vocabulary data from Google Sheets. Please check the console for details.</p>"
    );
  }
}

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

// Load data when the page is ready
$(document).ready(function () {
  loadDataFromGoogleSheets();
});
