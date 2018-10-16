/*
 * HTML5 Multiple Choice Quiz
 * Colin Bernard (www.wcln.ca)
 * October 2018
 */


// Global variables.
var versionName;
var counter;
var correctCounter;
var wrongCounter;
var jsonData;
var mute = false;
var startTime;
var endTime;

// Sounds
var clickSound;

// HTML elements we will be updating.
var questionTextElement;
var questionImageElement;
var optionLabelElements;
var optionInputElements;
var correctTextElement;
var wrongTextElement;


/*
 * Called by body onload.
 * Initialize game settings.
 */
function init(title) {
  versionName = title;

  // Load sounds.
  clickSound = new Audio('sounds/click.mp3');

  // Load elements.
  optionLabelElements = [];
  optionInputElements = [];

  $("label.option").each(function() {
    optionLabelElements.push(this)
  });

  $("input.option").each(function() {
    optionInputElements.push(this)
  });



  questionTextElement = document.getElementById("question-text");
  questionImageElement = document.getElementById("question-image");
  correctTextElement = document.getElementById("correct");
  wrongTextElement = document.getElementById("wrong");


  // Load the version JSON data into our variable.
  $.getJSON("versions/" + versionName + "/" + versionName + ".json", function(json) {
    jsonData = json;

    // Set title.
    document.getElementById("game-title").innerHTML = jsonData.title;

    // Load the first question.
    counter = correctCounter = wrongCounter = 0;
    loadQuestion();

    // Start timer.
    startTime = new Date().getTime();
  });
}

/*
 * The next button has been clicked.
 */
function next() {

  // Check that at least one radio button is checked.
  if ($("input[type=radio]:checked").length > 0) {
    // Check if correct.
    let correct = false;
    for (var radio of optionInputElements) {
      if (radio.checked) {
        if (radio.value === jsonData.questions[counter].answer) {
          correct = true;
        }
      }
    }

    // Notify user if selection was correct/incorrect.
    if (correct) {
      correctTextElement.innerHTML = "Correct: " + ++correctCounter;
    } else {
      wrongTextElement.innerHTML = "Wrong: " + ++wrongCounter;
    }

    // Play a click sound.
    playSound(clickSound);

    // Load next question.
    counter++;
    if (counter < jsonData.questions.length) {
      loadQuestion();
      if (counter === jsonData.questions.length - 1) {
        document.getElementById("next").innerHTML = "Finish";
      }
    } else {
      endGame();
    }
  } else {
    alert("Select an option.");
  }
}

function endGame() {
  $("#question-row").css("display", "none");
  $("#game-over-row").css("display", "flex");
  $("form").css("visibility", "hidden");
  $("#next").prop("disabled", true);

  $("#score-text").html("Score: " + correctCounter + "/" + jsonData.questions.length);
  $("#total-time").html("Total Time: " + ((new Date().getTime() - startTime)/1000).toFixed(1) + " seconds");
}

function restart() {
  $("#question-row").css("display", "inline");
  $("#game-over-row").css("display", "none");
  $("form").css("visibility", "visible");
  $("#next").html("Next");
  $("#wrong").html("Wrong: 0");
  $("#correct").html("Correct: 0");
    $("#next").prop("disabled", false);
  init(versionName);
}

function loadQuestion() {
  // Access question from JSON data.
  let question = jsonData.questions[counter];

  // Set question text.
  questionTextElement.innerHTML = question.question;

  // Set question image.
  questionImageElement.src = "versions/" + versionName + "/" + question.image;

  // Set the options (including answer).
  question.options.push({option: question.answer});
  shuffle(question.options);
  for (var i = 0; i < optionLabelElements.length; i++) {
    optionLabelElements[i].innerHTML = question.options[i].option;
    optionInputElements[i].value = question.options[i].option;
  }
}
