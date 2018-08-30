
var removeSVG = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="44.238px" height="44.238px" viewBox="0 0 44.238 44.238" style="enable-background:new 0 0 44.238 44.238;" xml:space="preserve"><g><g><g><path d="M15.533,29.455c-0.192,0-0.384-0.073-0.53-0.22c-0.293-0.293-0.293-0.769,0-1.062l13.171-13.171c0.293-0.293,0.768-0.293,1.061,0s0.293,0.768,0,1.061L16.063,29.235C15.917,29.382,15.725,29.455,15.533,29.455z"/></g><g><path d="M28.704,29.455c-0.192,0-0.384-0.073-0.53-0.22L15.002,16.064c-0.293-0.293-0.293-0.768,0-1.061s0.768-0.293,1.061,0l13.171,13.171c0.293,0.293,0.293,0.769,0,1.062C29.088,29.382,28.896,29.455,28.704,29.455z"/></g><path d="M22.119,44.237C9.922,44.237,0,34.315,0,22.12C0,9.924,9.922,0.001,22.119,0.001S44.238,9.923,44.238,22.12S34.314,44.237,22.119,44.237z M22.119,1.501C10.75,1.501,1.5,10.751,1.5,22.12s9.25,20.619,20.619,20.619s20.619-9.25,20.619-20.619S33.488,1.501,22.119,1.501z"/></g></g></svg>`

var completeSVG = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 52 52" style="enable-background:new 0 0 52 52;" xml:space="preserve"><g><path d="M26,0C11.664,0,0,11.663,0,26s11.664,26,26,26s26-11.663,26-26S40.336,0,26,0z M26,50C12.767,50,2,39.233,2,26S12.767,2,26,2s24,10.767,24,24S39.233,50,26,50z"/><path d="M38.252,15.336l-15.369,17.29l-9.259-7.407c-0.43-0.345-1.061-0.274-1.405,0.156c-0.345,0.432-0.275,1.061,0.156,1.406l10,8C22.559,34.928,22.78,35,23,35c0.276,0,0.551-0.114,0.748-0.336l16-18c0.367-0.412,0.33-1.045-0.083-1.411C39.251,14.885,38.62,14.922,38.252,15.336z"/></g></svg>`

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
    addItem(value);
  }
}

function addItem(text){

  var list = document.getElementById('todo');
  var item = document.createElement('li');
  item.innerText = text;

  var buttons = document.createElement('div');
  buttons.classList.add('buttons');

  var remove = document.createElement('button')
  remove.classList.add('remove');
  remove.innerHTML = removeSVG;

  var complete = document.createElement('button')
  complete.classList.add('complete');
  complete.innerHTML = completeSVG;

  buttons.appendChild(remove);
  buttons.appendChild(complete);
  item.appendChild(buttons)

  list.appendChild(item);
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
