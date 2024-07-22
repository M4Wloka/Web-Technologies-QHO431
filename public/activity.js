// html id
const van = document.getElementById("van");
const guitar = document.getElementById("guitar");
const score = document.getElementById("score");

//moving up
function move_up() {
  van.classList.add("move-up");
// after 50 ms come back to start positions
  setTimeout(() => van.classList.remove("move-up"), 500);
}

// eventlistener for moving - if press buttton move
document.addEventListener('keypress', (event) => {
  if (!van.classList.contains('jmove-up')) {
    move_up();
  }
});

// start with 0 score
let scoreValue = 0;

//van and guitar position as the integers 
setInterval(() => {
  const vanTop = parseInt(window.getComputedStyle(van).getPropertyValue('top'));
  const guitarLeft = parseInt(window.getComputedStyle(guitar).getPropertyValue('left'));
  
  // score continously
  score.innerText = scoreValue++; 

  //check position of the guitar 
  if (guitarLeft < -50) { 
    //if true move guitar to right
    guitar.style.left = '550px'; 
  }

  //reload in the case of the colisions
  if (guitarLeft < 100 && guitarLeft > 0 && vanTop > 150) {
    location.reload();
  }
}, 50);