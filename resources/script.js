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
  var minutes = Math.floor((time / 1000) % 60);

  return{
    'total' : time,
    'minutes' : minutes,
    'seconds' : seconds
  };
}
