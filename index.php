<!DOCTYPE html>
<html>
<head>
	<title>WCLN - Multiple Choice</title>
	<meta charset="utf-8"/>
	<!-- Latest compiled and minified CSS -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
	<!-- jQuery library -->
	<script src="https://bclearningnetwork.com/lib/jquery/jquery-3.2.1.min.js"></script>
	<!-- Latest compiled JavaScript -->
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	<link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Lato"><!-- google web font -->
	<link rel="stylesheet" type="text/css" href="style/style.css"/>
	<link rel="shortcut icon" href="images/favicon.ico"/>
	<script type="text/javascript" src="helper.js"></script>
	<script type="text/javascript" src="multiple_choice.js"></script><!-- the main game JS file -->
</head>
<body onload="init('<?=isset($_GET['title'])?$_GET['title']:null?>');"><!-- body onload calls function to initialize game -->
	<div class="container">
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
			<div class="col-md-12">
				<p id="start-text">The following multiple choice quiz will describe a triangle as well as show you a picture. You will need to select the correct type of triangle from the four options.</p>
				<button id="start" onclick="start()">Start</button>
			</div>
		</div>
		<div class="row text-center" id="game-over-row">
			<div class="col-md-12">
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
				<img id="question-image" src="images/triangle.png">
			</div>
		</div>
		<div class="row">
			<div class="col-md-12" id="form-div">
				<form action="">
				  <div class="option"><input type="radio" name="answer" value="1" class="option" id="option1"><label for="option1" class="option"></label></div>
				  <div class="option"><input type="radio" name="answer" value="2" class="option" id="option2"><label for="option2" class="option"></label></div>
				  <div class="option"><input type="radio" name="answer" value="3" class="option" id="option3"><label for="option3" class="option"></label></div>
				  <div class="option"><input type="radio" name="answer" value="4" class="option" id="option4"><label for="option4" class="option"></label></div>
				</form>
			</div>
		</div>
		<div class="row" id="bottom-bar">
			<div id="warning" class="col-md-4">
				<p>Select an option!</p>
			</div>
			<div class="col-md-8 pull-right text-right">
				<p id="correct">Correct: 0</p>
				<p id="wrong">Wrong: 0</p>
				<button id="next" onclick="next()">Next</button>
			</div>
		</div>
	</div>
</body>
</html>
