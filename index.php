<!DOCTYPE html>
<html>
<head>
	<title>WCLN - Multiple Choice</title>
	<meta charset="utf-8"/>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css">
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.min.js"></script>
	<link rel="stylesheet" type="text/css" href="style/style.css"/>
	<link rel="shortcut icon" href="images/favicon.ico"/>
	<script type="text/javascript" src="helper.js"></script>
	<script type="text/javascript" src="multiple_choice.js"></script>
</head>
<body onload="init('<?=isset($_GET['title'])?$_GET['title']:null?>');">
	<div class="container" id="main-container">
		<div class="row" id="heading-bar">
			<div class="col-sm-2">
				<img id="logo" src="images/logo.png">
			</div>
			<div class="col-sm-8 text-center">
				<h2 id="game-title"></h2>
			</div>
			<div class="col-sm-2">
				<a onclick="toggleMute()"><img id="mute-btn" src="images/unmute.png"></a>
			</div>
		</div>
		<div class="row text-center" id="start-row">
			<div class="col-sm-12">
				<img src="images/start_image.png" height="100px">
				<p id="start-text"></p>
				<p id="generic-start-text">The following quiz will ask you several questions. For each question, choose one of the options from the list below. You will be shown the correct answer if you choose the wrong answer. Click the 'Start' button below to begin the quiz.</p>
				<button id="start" onclick="start()">Start</button>
			</div>
		</div>
		<div class="row text-center" id="game-over-row">
			<div class="col-sm-12">
				<p id="quiz-complete">Quiz Complete!</p>
				<p id="score-text">Score: 0/0</p>
				<p id="total-time">Total Time: 0 seconds</p>
				<button id="restart" onclick="restart()">Restart</button>
			</div>
		</div>
		<div class="row text-center" id="question-row">
			<div class="col-sm-6 question">
				<p id="question-text"></p>
			</div>
			<div class="col-sm-6 question">
				<img id="question-image" src="">
			</div>
		</div>
		<div class="row">
			<div class="col-sm-12" id="form-div">
				<form action="">
				  <div class="option"><input type="radio" name="answer" value="1" class="option" id="option1"><label for="option1" class="option"></label></div>
				  <div class="option"><input type="radio" name="answer" value="2" class="option" id="option2"><label for="option2" class="option"></label></div>
				  <div class="option"><input type="radio" name="answer" value="3" class="option" id="option3"><label for="option3" class="option"></label></div>
				  <div class="option"><input type="radio" name="answer" value="4" class="option" id="option4"><label for="option4" class="option"></label></div>
				</form>
			</div>
		</div>
		<div class="row" id="bottom-bar">
			<div id="question-counter" class="col-sm-4">
				<p>0/0</p>
			</div>
			<div id="warning" class="col-sm-4">
				<p>Select an option!</p>
			</div>
			<div class="col-sm-8 pull-right text-right">
				<p id="correct">Correct: 0</p>
				<p id="wrong">Wrong: 0</p>
				<button id="next" onclick="next()">Submit</button>
			</div>
		</div>
	</div>
</body>
</html>
