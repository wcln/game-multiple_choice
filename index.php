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
	<script type="text/javascript" src="multiple_choice.js"></script><!-- the main game JS file -->

	<style>

		#heading-bar {
			background-color: #2aa5d6;
			height: 70px;
		}

		#heading-bar h2 {
			font-weight: 700;
		}

		.container {
			border: 1px solid grey;
			border-radius: 5px;
			width: 800px;
		}


		#question-row {
			height: 450px;
		}

		.question {
			height: inherit;
			margin: auto;
			position: relative;
		}

		#question-text {
			height: inherit;
			line-height: 450px;
			font-size: 20px;
		}

		#question-image {
			max-height: 100%;
	    max-width: 100%;
	    width: auto;
	    height: auto;
	    position: absolute;
	    top: 0;
	    bottom: 0;
	    left: 0;
	    right: 0;
	    margin: auto;
		}

		p#correct, p#wrong {
			display: inline;
			margin-right: 1em;
		}

		button#next {
			display: inline;
		}

		#bottom-bar {
			padding-bottom: 1em;
			padding-top: 1em;
			border-top: 1px solid grey;
			background-color: #f4f5f7;
		}

		#mute-btn {
			float: right;
			margin-top: 1em;
		}

		img#logo {
			margin-top: .5em;
		}

		#correct, #wrong, #next {
			font-weight: 700;
			font-size: 18px;
		}

		#correct {
			color: green;
		}

		#wrong {
			color: red;
		}

		input[type='radio'] {
			margin-right: 1em;
			margin-bottom: .7em;
			font-size: 30px;
		}

		label {
			font-size: 17px;
		}

	</style>
</head>
<body onload="init();"><!-- body onload calls function to initialize game -->
	<div class="container">
		<div class="row" id="heading-bar">
			<div class="col-md-3">
				<img id="logo" height="50px" src="images/logo.png">
			</div>
			<div class="col-md-6 text-center">
				<h2 id="game-title">Test Title</h2>
			</div>
			<div class="col-md-3">
				<a href=""><img id="mute-btn" src="images/mute.png"></a>
			</div>
		</div>
		<div class="row text-center" id="question-row">
			<div class="col-md-6 question">
				<p id="question-text">This triangle has three equal sides. It is:</p>
			</div>
			<div class="col-md-6 question">
				<img id="question-image" src="images/triangle.png">
			</div>
		</div>
		<div class="row">
			<div class="col-md-12">
				<form action="">
				  <input type="radio" name="answer" value="1"><label> an equilateral triangle</label><br>
				  <input type="radio" name="answer" value="2"><label> an isosceles triangle</label><br>
				  <input type="radio" name="answer" value="3"><label> a scalene triangle</label><br>
				  <input type="radio" name="answer" value="4"><label> a right-angled triangle</label>
				</form>
			</div>
		</div>
		<div class="row" id="bottom-bar">
			<div class="col-md-5 pull-right text-right">
				<p id="correct">Correct: 0</p>
				<p id="wrong">Wrong: 0</p>
				<button id="next" onclick="next()">Next</button>
			</div>
		</div>
	</div>


</body>
</html>
