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
  alertSound = new Audio('sounds/alert.mp3');

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

    // Set instructions.
    document.getElementById("start-text").innerHTML = jsonData.instructions;

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

      // The next click will be the second click.
      firstClick = false;

      // Check if correct.
      let correct = false;
      let correctRadioElement = null;
      // For each radio button...
      $("p.feedback").remove();
      for (var radio of optionInputElements) {
        // If this radio button is the correct answer.
        if (radio.value === jsonData.questions[counter].answer) {
          // Highlight it.
          radio.parentElement.classList.add("correct");

          // Store the radio element in a variable so that if the user got the question wrong, we can add feedback to it later.
          correctRadioElement = radio;

          // If the correct radio button is checked, the user has chosen the correct answer.
          if (radio.checked) {
            correct = true;
          }
        // If this is not the correct radio button, but it is checked.
        } else if (radio.checked) {
          // The user has chosen the wrong option.
          radio.parentElement.classList.add("wrong");
          let givenAnswerTextElement = document.createElement("p");
          givenAnswerTextElement.innerHTML = "Given Answer";
          givenAnswerTextElement.classList.add("feedback");
          radio.parentElement.appendChild(givenAnswerTextElement);
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

        let correctAnswerTextElement = document.createElement("p");
        correctAnswerTextElement.innerHTML = "Correct Answer";
        correctAnswerTextElement.classList.add("feedback");
        correctRadioElement.parentElement.appendChild(correctAnswerTextElement);
      }

      // If the next question is the last question.
      if (counter === jsonData.questions.length - 1) {
        // Change the 'Next' button to read 'Finish'.
        $("#next").html("Finish");
      } else {
        // Change 'Submit' button to 'Next'.
        $("#next").html("Next");
      }

    // An option was not selected.
    } else {
      // Notify the user that an option must be selected.
      showWarning();
    }
  } else {

    // Clear CSS class on option <div>.
    clearSelectedDiv();

    // Reset correct/incorrect highlights.
    firstClick = true;
    $("div.option").each(function() {
      $(this).removeClass("wrong correct");
    })

    // Change 'Next' button to 'Submit'.
    $("#next").html("Submit");

    // Play the click sound.
    playSound(clickSound);

    // Load next question.
    counter++;
    if (counter < jsonData.questions.length) {
      loadQuestion();
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
  $("#question-counter").css("display", "none");

  $("#score-text").html("Score: " + correctCounter + "/" + jsonData.questions.length);

  // Show total quiz time taken.
  let totalSeconds = Math.floor((new Date().getTime() - startTime)/1000);
  let totalMinutes = Math.floor(totalSeconds / 60);
  let leftoverSeconds = totalSeconds % 60;
  $("#total-time").html("Total Time: " + (totalMinutes == 0? "":totalMinutes + " min") + (leftoverSeconds == 0? "":" " + leftoverSeconds + " sec"));
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
  $("#next").html("Submit");
  $("#wrong").html("Wrong: 0");
  $("#correct").html("Correct: 0");
  $("#next").prop("disabled", false);
  $("#main-container").css("background-image", 'url("images/background.jpg")');
  init(versionName);
}

/*
 * Load a question based on the value of the variable 'counter'.
 */
function loadQuestion() {

  // Ensure no radio is checked when question is initally shown.
  clearSelectedRadio();

  // Update question counter.
  $("#question-counter > p").html((counter+1) + "/" + jsonData.questions.length);

  // Access question from JSON data.
  let question = jsonData.questions[counter];

  // Set question text.
  questionTextElement.innerHTML = question.question;

  // Check if there is an image or only text.
  if (question.image == null || question.image == "") {
    // Hide the image <div>.
    questionImageElement.parentElement.style.display = "none";
    // Add a class to the question text to center it.
    questionTextElement.parentElement.classList.remove("col-sm-6");
    questionTextElement.parentElement.classList.add("col-sm-12", "centered-question");
  } else {
    // Set question image.
    questionImageElement.src = "versions/" + versionName + "/" + question.image;
    // Remove 'question-centered' class from text <div> and re-display image <div>.
    questionImageElement.parentElement.style.display = "block";
    questionTextElement.parentElement.classList.remove("col-sm-12", "centered-question");
    questionTextElement.parentElement.classList.add("col-sm-6");
  }

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
  $("#next").html("Submit");
  $("#wrong").html("Wrong: 0");
  $("#correct").html("Correct: 0");
  $("#next").prop("disabled", false);
  $("#main-container").css("background-image", "linear-gradient(to bottom right, white, #a1e2fc)");

  // Show question counter.
  $("#question-counter").css("display", "block");

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

/*
 * Ennsure no radio button is selected when a question is initially shown.
 */
function clearSelectedRadio() {
  $('input[type="radio"]').each(function() {
    $(this).prop("checked", false);
  })
}

/*
 * Momentarily show the warning <div> at the bottom of the screen.
 * Hide the question counter <div>.
 */
function showWarning() {
  playSound(alertSound);
  $("#question-counter").css("display", "none");
  $("#warning").css("display", "block");
  setTimeout(function() {
    $("#warning").css("display", "none");
    $("#question-counter").css("display", "block");
  }, 2000);
}
