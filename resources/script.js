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
  var timer = document.getElementById('timer');
  var minutesSpan = timer.querySelector('.minutes');
  var secondsSpan = timer.querySelector('.seconds');

  function updateTimer() {
    var remTime = getRemainingTime(endtime);
    minutesSpan.innerHTML = ('0' + remTime.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + remTime.seconds).slice(-2);

    if (remTime.total <= 0) {
      clearInterval(timeInterval);
    }

  }
  updateTimer();
  var timeInterval = setInterval(updateTimer, 1000);

}
// placeholder
var mins = 10
var deadline = new Date(Date.parse(new Date()) + mins * 60 * 1000);
console.log(deadline);
initalize(deadline);
