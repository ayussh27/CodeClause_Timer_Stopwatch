$(document).ready(function() {
	// Variables for the timer
	let timerInterval;
	let timerHours = 0;
	let timerMinutes = 0;
	let timerSeconds = 0;
	let timerAlarmTime;
	let timerAlarmInterval;
  
	// Variables for the stopwatch
	let stopwatchInterval;
	let stopwatchHours = 0;
	let stopwatchMinutes = 0;
	let stopwatchSeconds = 0;
	let stopwatchMilliseconds = 0;
  
	// Elements for the timer
	const timerContainer = $("#timer-container");
	const timerHoursDisplay = $("#timer-hours");
	const timerMinutesDisplay = $("#timer-minutes");
	const timerSecondsDisplay = $("#timer-seconds");
	const startTimerButton = $("#start-timer");
	const pauseTimerButton = $("#pause-timer");
	const stopTimerButton = $("#stop-timer");
	const timerAlarmTimeInput = $("#timer-alarm-time");
	const setTimerAlarmButton = $("#set-timer-alarm");
	const clearTimerAlarmButton = $("#clear-timer-alarm");
  
	// Elements for the stopwatch
	const stopwatchContainer = $("#stopwatch-container");
	const stopwatchHoursDisplay = $("#stopwatch-hours");
	const stopwatchMinutesDisplay = $("#stopwatch-minutes");
	const stopwatchSecondsDisplay = $("#stopwatch-seconds");
	const stopwatchMillisecondsDisplay = $("#stopwatch-milliseconds");
	const startStopwatchButton = $("#start-stopwatch");
	const pauseStopwatchButton = $("#pause-stopwatch");
	const splitStopwatchButton = $("#split-stopwatch");
	const stopStopwatchButton = $("#stop-stopwatch");
  
	// Audio element for the alarm sound
	const alarmSound = $("#alarm-sound")[0];
  
	// Switch between the timer and stopwatch views
	$("#timer-link").click(function() {
	  timerContainer.show();
	  stopwatchContainer.hide();
	  $(this).addClass("active");
	  $("#stopwatch-link").removeClass("active");
	});
  
	$("#stopwatch-link").click(function() {
	  timerContainer.hide();
	  stopwatchContainer.show();
	  $(this).addClass("active");
	  $("#timer-link").removeClass("active");
	});
  
	// Event listeners for the timer
	startTimerButton.click(function() {
	  timerInterval = setInterval(function() {
		timerSeconds++;
		if (timerSeconds === 60) {
		  timerSeconds = 0;
		  timerMinutes++;
		  if (timerMinutes === 60) {
			timerMinutes = 0;
			timerHours++;
		  }
		}
		timerHoursDisplay.text(padNumber(timerHours));
		timerMinutesDisplay.text(padNumber(timerMinutes));
		timerSecondsDisplay.text(padNumber(timerSeconds));
		checkTimerAlarm();
	  }, 1000);
	});
  
	pauseTimerButton.click(function() {
	  clearInterval(timerInterval);
	});
  
	stopTimerButton.click(function() {
	  clearInterval(timerInterval);
	  timerHours = 0;
	  timerMinutes = 0;
	  timerSeconds = 0;
	  timerHoursDisplay.text("00");
	  timerMinutesDisplay.text("00");
	  timerSecondsDisplay.text("00");
	  clearTimerAlarm();
	});
  
	setTimerAlarmButton.click(function() {
	  const alarmTimeString = timerAlarmTimeInput.val();
	  if (alarmTimeString) {
		timerAlarmTime = new Date(`1970-01-01T${alarmTimeString}:00Z`);
		clearTimerAlarm();
		timerAlarmInterval = setInterval(function() {
		  checkTimerAlarm();
		}, 1000);
	  }
	});
  
	clearTimerAlarmButton.click(function() {
	  clearTimerAlarm();
	});
  
	function checkTimerAlarm() {
	  if (timerAlarmTime) {
		const currentTime = new Date();
  const difference = timerAlarmTime.getTime() - currentTime.getTime();
  if (difference <= 0) {
  clearInterval(timerInterval);
  clearInterval(timerAlarmInterval);
  playAlarmSound();
  }
  }
  }
  
  function clearTimerAlarm() {
  clearInterval(timerAlarmInterval);
  timerAlarmTime = null;
  timerAlarmTimeInput.val("");
  }
  
  // Event listeners for the stopwatch
  startStopwatchButton.click(function() {
  stopwatchInterval = setInterval(function() {
  stopwatchMilliseconds += 10;
  if (stopwatchMilliseconds === 1000) {
  stopwatchMilliseconds = 0;
  stopwatchSeconds++;
  if (stopwatchSeconds === 60) {
  stopwatchSeconds = 0;
  stopwatchMinutes++;
  if (stopwatchMinutes === 60) {
  stopwatchMinutes = 0;
  stopwatchHours++;
  }
  }
  }
  stopwatchHoursDisplay.text(padNumber(stopwatchHours));
  stopwatchMinutesDisplay.text(padNumber(stopwatchMinutes));
  stopwatchSecondsDisplay.text(padNumber(stopwatchSeconds));
  stopwatchMillisecondsDisplay.text(padNumber(stopwatchMilliseconds, 3));
  }, 10);
  });
  
  pauseStopwatchButton.click(function() {
  clearInterval(stopwatchInterval);
  });
  
  splitStopwatchButton.click(function() {
  const splitTime = formatStopwatchTime(stopwatchHours, stopwatchMinutes, stopwatchSeconds, stopwatchMilliseconds);
  const splitElement = $("<li>").text(splitTime);
  $("#stopwatch-splits").append(splitElement);
  });
  
  stopStopwatchButton.click(function() {
  clearInterval(stopwatchInterval);
  stopwatchHours = 0;
  stopwatchMinutes = 0;
  stopwatchSeconds = 0;
  stopwatchMilliseconds = 0;
  stopwatchHoursDisplay.text("00");
  stopwatchMinutesDisplay.text("00");
  stopwatchSecondsDisplay.text("00");
  stopwatchMillisecondsDisplay.text("000");
  $("#stopwatch-splits").empty();
  });
  
  function padNumber(number, digits = 2) {
  return number.toString().padStart(digits, "0");
  }
  
  function formatStopwatchTime(hours, minutes, seconds, milliseconds) {
  const timeString = $(padNumber(hours)).$(padNumber(minutes)).$(padNumber(seconds)).$(padNumber(milliseconds, 3));
  return timeString;
  }
  
  function playAlarmSound() {
  alarmSound.play();
  }
  });
