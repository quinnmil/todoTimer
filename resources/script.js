/*
TodoTimer Application
A productivity tool devloped for practice with Javascript.
Followed various tutorial and example code.
Full citation will be avaible before deployment.

Author: Quinn Milionis
*/

// SVG code for complete and delete icons.
var removeSVG = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="44.238px" height="44.238px" viewBox="0 0 44.238 44.238" style="enable-background:new 0 0 44.238 44.238;" xml:space="preserve"><g><g><g><path d="M15.533,29.455c-0.192,0-0.384-0.073-0.53-0.22c-0.293-0.293-0.293-0.769,0-1.062l13.171-13.171c0.293-0.293,0.768-0.293,1.061,0s0.293,0.768,0,1.061L16.063,29.235C15.917,29.382,15.725,29.455,15.533,29.455z"/></g><g><path d="M28.704,29.455c-0.192,0-0.384-0.073-0.53-0.22L15.002,16.064c-0.293-0.293-0.293-0.768,0-1.061s0.768-0.293,1.061,0l13.171,13.171c0.293,0.293,0.293,0.769,0,1.062C29.088,29.382,28.896,29.455,28.704,29.455z"/></g><path d="M22.119,44.237C9.922,44.237,0,34.315,0,22.12C0,9.924,9.922,0.001,22.119,0.001S44.238,9.923,44.238,22.12S34.314,44.237,22.119,44.237z M22.119,1.501C10.75,1.501,1.5,10.751,1.5,22.12s9.25,20.619,20.619,20.619s20.619-9.25,20.619-20.619S33.488,1.501,22.119,1.501z"/></g></g></svg>`
var completeSVG = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 52 52" style="enable-background:new 0 0 52 52;" xml:space="preserve"><g><path d="M26,0C11.664,0,0,11.663,0,26s11.664,26,26,26s26-11.663,26-26S40.336,0,26,0z M26,50C12.767,50,2,39.233,2,26S12.767,2,26,2s24,10.767,24,24S39.233,50,26,50z"/><path d="M38.252,15.336l-15.369,17.29l-9.259-7.407c-0.43-0.345-1.061-0.274-1.405,0.156c-0.345,0.432-0.275,1.061,0.156,1.406l10,8C22.559,34.928,22.78,35,23,35c0.276,0,0.551-0.114,0.748-0.336l16-18c0.367-0.412,0.33-1.045-0.083-1.411C39.251,14.885,38.62,14.922,38.252,15.336z"/></g></svg>`

// todo could these be the same var?
var running = 0;
var timeInterval;

// stores local data.
var data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')) : {
  todo: [],
  completed: []
};

console.log(JSON.parse(localStorage.getItem('todoList')));

// pomodoro sequence. Stage index's into this.
const POMODORO = [.025, 0.025, 25, 5, 25, 5, 15];
var stage = 0;
// time vars used for pausing/stopping.
var remMins = 0;
var remSecs = 0;

var selected = ''
// DOM selectors
var timer = document.getElementById('timer'); // timer object
var startButton = document.getElementById('startButton');
var toggleButton = document.getElementById('toggleButton');
var addTaskButton = document.getElementById('addTask');
var entry = document.getElementsByClassName('entry')[0]; // task entry object

startButton.addEventListener('click', startTimer);
toggleButton.addEventListener('click', toggleTimer);

// renderTodolist();

// Event listners/helpers. These could be better implemented.

// opens entry panel. in current implemntation, this coudl just remain open.
addTaskButton.addEventListener('click', function() {
  entry.style.display = 'inline-block';
  this.style.display = 'none';
});

document.getElementById('add').addEventListener('click', function() {
  value = document.getElementById('item').value;
  if (value) {
    newTodoItem(value);
    entry.style.display = 'none';
    addTaskButton.style.display = 'inline-block'
  }
});

document.getElementById('item').addEventListener('keydown', function(e) {
  var value = this.value;
  if (e.code === 'Enter' && value) {
    newTodoItem(value);
    entry.style.display = 'none';
    addTaskButton.style.display = 'inline-block'
  }
});


function renderTodolist() {
  // if there is nothing in the local storage, return.
  if (!data.todo.length && !data.completed.length) return;

  for (var i = 0; i < data.todo.length; i++) {
    var value = data.completed[i];
    addItem(value);

  }
  for (var j = 0; j < data.completed.length; j++); {
    var value = data.completed[i];
    addItem(value, true);
  }
}

function dataObjectUpdate() {
  jsonData = JSON.stringify(data);
  // IDEA: use mongodb instead.
  localStorage.setItem('todoList', jsonData);
}

function newTodoItem(value) {

  addItem(value);
  document.getElementById('item').value = '';

  // add to data object
  data.todo.push(value);
  dataObjectUpdate();
}


function addItem(text, completed) {
  // updateSelected()

  var list = (completed) ? document.getElementById('completed') : document.getElementById('todo');
  var item = document.createElement('li');

  // item.classList.add("active")
  item.innerText = text;

  var buttons = document.createElement('div');
  buttons.classList.add('buttons');

  var remove = document.createElement('button')
  remove.classList.add('remove');
  remove.innerHTML = removeSVG;

  // add click event for removing item.
  remove.addEventListener('click', removeItem);

  // click event for 'completing item'
  var complete = document.createElement('button')
  complete.classList.add('complete');
  complete.innerHTML = completeSVG;
  complete.addEventListener('click', completeItem);

  buttons.appendChild(remove);
  buttons.appendChild(complete);
  item.appendChild(buttons)

  // item.addEventListener('click', selectItem);

  list.insertBefore(item, list.childNodes[0]);
}

function removeItem(eventObject) {
  var item = this.parentNode.parentNode;
  var parent = item.parentNode;
  var id = parent.id;
  var value = item.innerText;

  if (id === 'todo') {
    data.todo.splice(data.todo.indexOf(value), 1);
  } else {
    data.completed.splice(data.completed.indexOf(value), 1);
  }
  dataObjectUpdate();
  parent.removeChild(item);
}

function completeItem() {
  console.log('completing item');
  var item = this.parentNode.parentNode;
  var parent = item.parentNode;
  var id = parent.id;
  var value = item.innerText;

  // removes value from todo array, adds to completed.
  if (id === 'todo') {
    data.todo.splice(data.todo.indexOf(value), 1);
    data.completed.push(value);
  } else {
    data.completed.splice(data.completed.indexOf(value), 1);
    data.todo.push(value);
  }
  dataObjectUpdate();

  // check if item added to complted list or re-added to todo.
  // if id is todo, target is 'completed', if not, target is 'todo'
  var target = (id === 'todo') ? document.getElementById('completed') : document.getElementById('todo');
  parent.removeChild(item);
  target.insertBefore(item, target.childNodes[0]);
}


// Net yet implemented
function selectObject(eventObject) {
  console.log('completing item');
  var item = this.parentNode.parentNode;
  var parent = item.parentNode;
  var id = parent.id;
  var value = item.innerText;

  // if any other items have been selected, remove this class.
  if (selected != ''){
    var previous = document.getElementsByClassName('selected')[0];
    previous.classList.remove('selected');
  }
  item.classList.add('selected');

  }


// var header = document.getElementById("todoLlist");
// var btns = document.getElementsByClassName("todo");
// for (var i = 0; i < btns.length; i++) {
//   btns[i].addEventListener("click", function() {
//     console.log(this);
//     var current = document.getElementsByClassName("active");
//     current[0].className = current[0].className.replace(" active", "");
//     this.className += " active";
//   })



// Timer Functions

function incrementStage() {
  var sequenceStatus = document.querySelector('.stage');

  if (stage <= 5) {
    if ((stage%2) != 1){
      sequenceStatus.innerHTML = ("Break")
    } else {
      sequenceStatus.innerHTML = ("Focus")
    }
    stage += 1;
  } else stage = 0;
  startTimer();
}

function startTimer() {
  timer.style.display = 'inline-block';
  startButton.style.display = 'none';
  toggleButton.style.display = 'inline-block';
  var mins = POMODORO[stage];

  running = 1;
  var deadline = new Date(Date.parse(new Date()) + mins * 60 * 1000);
  initalize(deadline);
}

function getRemainingTime(endtime) {
  // gets difference between current time and time remainging
  var time = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((time / 1000) % 60);
  var minutes = Math.floor((time / 1000 / 60) % 60);

  return {
    'total': time,
    'minutes': minutes,
    'seconds': seconds
  };
}

function initalize(endtime) {
  // starts timer with specificed time.
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
      incrementStage()
    }

  }
  updateTimer();
  if (running) {
    timeInterval = setInterval(updateTimer, 1000);
  }
}



function toggleTimer() {
  if (running === 1) {
    this.innerHTML = 'continue';
    clearInterval(timeInterval);
    running = 0;
  } else {
    this.innerHTML = 'pause';
    // creates new deadline from remainging time on clock.
    running = 1;
    var deadline = new Date(Date.parse(new Date()) + remMins * 60 * 1000 + remSecs * 1000);
    initalize(deadline)
  }
}
