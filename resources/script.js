
var running = 0;
var mins = 10;

var remMins = 0;
var remSecs = 0;
var timer = document.getElementById('timer');
var startButton = document.getElementById('startButton');

document.getElementById('add').addEventListener('click', buttonClicked);

// user clicked on add button
// if there's any text, send.
function buttonClicked(){
  console.log('button clicked');
  var value = document.getElementById('item').value;
  if (value) {
    console.log('theres a value')
  }
}

function getRemainingTime(endtime) {
  // gets difference between current time and time remainging
  var time = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((time / 1000) % 60);
  var minutes = Math.floor((time / 1000 / 60) % 60);

  return{
    'total' : time,
    'minutes' : minutes,
    'seconds' : seconds
  };
}
function initalize(endtime) {
  var minutesSpan = timer.querySelector('.minutes');
  var secondsSpan = timer.querySelector('.secs');
  function updateTimer() {
    var remTime = getRemainingTime(endtime);
    // update global varibles
    remMins = remTime.minutes;
    remSecs = remTime.seconds;

    minutesSpan.innerHTML = ('0' + remMins).slice(-2);
    secondsSpan.innerHTML = ('0' + remSecs).slice(-2);

    if (remTime.total <= 0) {
      clearInterval(timeInterval);
    }

  }
  updateTimer();
  if (running){
    var timeInterval = setInterval(updateTimer, 1000);
  }
}

function startTimer(){
  timer.style.display = 'inline-block';
  startButton.style.display = 'none';
  running = 1;
  var deadline = new Date(Date.parse(new Date()) + mins * 60 * 1000);
  initalize(deadline);
}
// funciton pauseTimer(){
//
// }
startButton.addEventListener('click', startTimer);
