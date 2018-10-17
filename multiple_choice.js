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
var firstClick;

// Sounds
var clickSound;
var correctSound;
var wrongSound;

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

  // Show the start screen.
  showStartScreen();

  // Load sounds.
  clickSound = new Audio('sounds/click.mp3');
  correctSound = new Audio('sounds/correct.mp3');
  wrongSound = new Audio('sounds/wrong.mp3');

  // Initialize arrays to hold some HTML elements.
  optionLabelElements = [];
  optionInputElements = [];

  // Load array of <label>'s.
  $("label.option").each(function() {
    optionLabelElements.push(this)
  });

  // Load array of <input>'s.
  $("input.option").each(function() {
    optionInputElements.push(this)
  });

  // Load some other HTML <p> and <img> elements into variables.
  questionTextElement = document.getElementById("question-text");
  questionImageElement = document.getElementById("question-image");
  correctTextElement = document.getElementById("correct");
  wrongTextElement = document.getElementById("wrong");

  // Make the option <div>'s clickable.
  $("div.option").each(function() {
    this.onclick = function() {
      clearSelectedDiv();
      this.childNodes[0].checked = true; // Check the radio button.
      this.classList.add("checked"); // Highlight the <div>.
    }
  });

  // Add listener to radio buttons. Highlight parent <div> when they are clicked.
  $('input[type="radio"]').click(function(){
    clearSelectedDiv();
    if ($(this).is(':checked'))
    {
      this.parentElement.classList.add("checked");
    }
   });

  // Load the version JSON data into our variable.
  $.getJSON("versions/" + versionName + "/" + versionName + ".json", function(json) {
    jsonData = json;

    // Set title.
    document.getElementById("game-title").innerHTML = jsonData.title;

    // Reset counters and variables. This is needed when game is reset.
    counter = correctCounter = wrongCounter = 0;
    firstClick = true;

    // Load the first question.
    loadQuestion();
  });
}

/*
 * The next button has been clicked.
 */
function next() {

  // Check if this is the first or second time the user has clicked 'Next'.
  // On the first click, show the correct answer.
  // On the second click, move to the next question.
  if (firstClick) {
    // Check that at least one radio button is checked.
    if ($("input[type=radio]:checked").length > 0) {

      // Check if correct.
      let correct = false;
      // For each radio button...
      for (var radio of optionInputElements) {

        // If this radio button is the correct answer.
        if (radio.value === jsonData.questions[counter].answer) {
          // Highlight it.
          radio.parentElement.classList.add("correct");
          // If the correct radio button is checked, the user has chosen the correct answer.
          if (radio.checked) {
            correct = true;
          }
        // If this is not the correct radio button, but it is checked.
        } else if (radio.checked) {
          // The user has chosen the wrong option.
          radio.parentElement.classList.add("wrong");
        }
      }

      // Notify user if selection was correct/incorrect.
      if (correct) {
        // Play the 'correct' sound.
        playSound(correctSound);
        // Increment the 'correct' counter.
        correctTextElement.innerHTML = "Correct: " + ++correctCounter;
      } else {
        // Play the 'wrong' sound.
        playSound(wrongSound);
        // Increment the 'wrong' counter.
        wrongTextElement.innerHTML = "Wrong: " + ++wrongCounter;
      }

      // The next click will be the second click.
      firstClick = false;

    // An option was not selected.
    } else {
      // Notify the user that an option must be selected.
      $("#warning").css("display", "block");
      setTimeout(function() {
        $("#warning").css("display", "none");
      }, 2000);

    }
  } else {

    // Clear CSS class on option <div>.
    $('input[type="radio"]').each(function() {
      this.parentElement.classList.remove("checked");
    });

    // Reset correct/incorrect highlights.
    firstClick = true;
    $("div.option").each(function() {
      $(this).removeClass("wrong correct");
    })

    // Play a click sound.
    playSound(clickSound);

    // Load next question.
    counter++;
    if (counter < jsonData.questions.length) {
      loadQuestion();
      // If the next question is the last question.
      if (counter === jsonData.questions.length - 1) {
        // Change the 'Next' button to read 'Finish'.
        document.getElementById("next").innerHTML = "Finish";
      }
    } else {
      // Call a function which displays the end game screen.
      endGame();
    }
  }

}

/*
 * Show the end game <div>.
 * Hide the options <div>.
 */
function endGame() {
  $("#question-row").css("display", "none");
  $("#game-over-row").css("display", "flex");
  $("form").css("visibility", "hidden");
  $("#next").prop("disabled", true);

  $("#score-text").html("Score: " + correctCounter + "/" + jsonData.questions.length);
  $("#total-time").html("Total Time: " + ((new Date().getTime() - startTime)/1000).toFixed(1) + " seconds");
}

/*
 * Called when the 'Restart' button is clicked.
 * Undo settings done by endGame and call the init function.
 */
function restart() {
  playSound(clickSound);
  $("#question-row").css("display", "block");
  $("#game-over-row").css("display", "none");
  $("form").css("visibility", "visible");
  $("#next").html("Next");
  $("#wrong").html("Wrong: 0");
  $("#correct").html("Correct: 0");
  $("#next").prop("disabled", false);
  init(versionName);
}

/*
 * Load a question based on the value of the variable 'counter'.
 */
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

/*
 * Hide main quiz <div>'s.
 * Show the start screen <div>.
 */
function showStartScreen() {
  $("#question-row").css("display", "none");
  $("form").css("visibility", "hidden");
  $("#next").prop("disabled", true);
  $("#start-row").css("display", "flex");
}

/*
 * Called when start button is pressed.
 * Removes start screen and shows main quiz <div>'s.
 */
function start() {
  playSound(clickSound);
  $("#question-row").css("display", "block");
  $("#start-row").css("display", "none");
  $("form").css("visibility", "visible");
  $("#next").html("Next");
  $("#wrong").html("Wrong: 0");
  $("#correct").html("Correct: 0");
  $("#next").prop("disabled", false);

  // Start timer.
  startTime = new Date().getTime();
}

/*
 * Remove 'checked' class from all option <div>'s.
 */
function clearSelectedDiv() {
  $('input[type="radio"]').each(function() {
    this.parentElement.classList.remove("checked");
  });
}
