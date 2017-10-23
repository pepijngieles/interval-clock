/*

	CONTENTS

	1. Variables
	2. Alert functions
	3. Start intervals
	4. Reset intervals
	5. Attach functions to buttons
	6. Update clock every second

*/


// 1. Variables
var sound = new Audio("alert.mp3"),

	// Intervals
	refreshAlerts = 0,
	refreshHands = 0,

	// Timeouts
	timeoutOne,
	timeoutTwo,
	totalTimeoutValue,

	// States
	clockRunning = false,
	currentTime = 0,
	seconds,
	minutes,
	hour,

	// Clock
	secondHand = document.getElementsByClassName('seconds')[0],
	minuteHand = document.getElementsByClassName('minutes')[0],
	hourHand = document.getElementsByClassName('hours')[0],

	// Inputs
	timeoutOneInput = document.getElementsByClassName("timeoutOne")[0],
	timeoutTwoInput = document.getElementsByClassName("timeoutTwo")[0],

	// Buttons
	startButton = document.getElementsByClassName("start")[0],
	resetButton = document.getElementsByClassName("reset")[0];


// 2. Alert functions
function takeBrake() {
	sound.play();
	alert('Take a brake ^^');
}

function goStudy() {
	sound.play();
	alert('Time to study..');
}


// 3. Start intervals
function startClock() {

	// Stop function if a field is empty
	if(timeoutOneInput.value == "" || timeoutTwoInput.value == "" ) {
		return false;
	}

	// Stop function if clock is already running
	if(clockRunning) {
		return false;
	} else{
		clockRunning = true;
	}

	// Get input values
	timeoutOneValue = timeoutOneInput.value * 60000;
	timeoutTwoValue = timeoutTwoInput.value * 60000;
	totalTimeoutValue = parseInt(timeoutOneValue, 10) + parseInt(timeoutTwoValue, 10);

	// Set timeouts for the alerts with variables
	timeoutOne = setTimeout(takeBrake, timeoutOneValue);
	timeoutTwo = setTimeout(goStudy, totalTimeoutValue);

	// Set interval to repeat the timeouts after completion
	refreshAlerts = setInterval(function () {
		timeoutOne = setTimeout(takeBrake, timeoutOneValue);
		timeoutTwo = setTimeout(goStudy, totalTimeoutValue);
	}, totalTimeoutValue);
}


// 4. Reset intervals
function resetClock() {
	// Update time and status
	clockRunning = false;

	// Clear timeouts & intervals
	clearTimeout(timeoutOne);
	clearTimeout(timeoutTwo);
	clearInterval(refreshAlerts);
	clearInterval(refreshHands);
}


// 5. Attach functions to buttons
startButton.addEventListener('click', startClock, false);
resetButton.addEventListener('click', resetClock, false);


// 6. Update clock every second
function updateClock() {
	currentTime = new Date(),
	seconds = currentTime.getSeconds() * 6,
	minutes = currentTime.getMinutes() * 6,
	hours = (currentTime.getHours() * 30) + (currentTime.getMinutes() / 2);

	secondHand.style.WebkitTransform = "rotate(" + seconds + "deg)";
	secondHand.style.transform = "rotate(" + seconds + "deg)";

	minuteHand.style.WebkitTransform = "rotate(" + minutes + "deg)";
	minuteHand.style.transform = "rotate(" + minutes + "deg)";

	hourHand.style.WebkitTransform = "rotate(" + hours + "deg)";
	hourHand.style.transform = "rotate(" + hours + "deg)";
}

var startClock = setInterval(function () {
	updateClock();
}, 1000);