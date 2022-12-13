var timer;
var health = [100, 100];

function applyForce(turn) {
  var ball = document.getElementById("ball");
  var force = document.getElementById("f" + turn);
  var target = document.getElementById("t" + turn);
  force.style.visibility = "visible";
  ball.style.visibility = "visible";
  target.style.visibility = "hidden";
  timer = setInterval(function() { force.value += 1; }, 30);
}

function applyThrow(turn) {
  var ball = document.getElementById("ball");
    
  var force = document.getElementById("f" + turn);
  var landingPosition = 0;
  var player = document.getElementById("p" + turn);
  var enemy = document.getElementById("p" + (turn % 2 + 1));

  clearInterval(timer);
  player.style.pointerEvents = "none";
  force.style.visibility = "hidden";

  landingPosition = window.innerWidth * 1.325 * force.value / 100;
  document.documentElement.style.setProperty("--landing-position", landingPosition + "px");
  
  ball.classList.toggle("left");
  ball.classList.toggle("right");

  ball.addEventListener('animationend', function() {
    var target = document.getElementById("t" + (turn % 2 + 1));
    
    ball.style.visibility = "hidden";
    if (landingPosition > window.innerWidth * 0.585 && landingPosition < window.innerWidth * 0.75) {
      var hp = document.getElementById("hp" + (turn % 2 + 1));
      enemy.classList.add("cry");
      health[turn - 1] -= 10;
      hp.style.width = health[turn - 1] + "%";
      if (health[turn - 1] <= 20) {
        hp.style.backgroundColor = "red";
      }
      else if (health[turn - 1] <= 50) {
        hp.style.backgroundColor = "var(--orange)";
      }
      enemy.addEventListener('animationend', function() {
        enemy.classList.remove("cry");
        enemy.style.pointerEvents = "initial";
        enemy.classList.remove("standard");
        target.style.visibility = "visible";
        enemy.classList.add("fight");
        player.classList.remove("fight");
        player.classList.add("standard");
      }, { once: true });
    }
    else {
      enemy.style.pointerEvents = "initial";
      enemy.classList.remove("standard");
      target.style.visibility = "visible";
      enemy.classList.add("fight");
      player.classList.remove("fight");
      player.classList.add("standard");
    }
    force.value = 0;
  }, { once: true });
}

function startGame() {
  var startPage = document.getElementById("start-page");
  var player = document.getElementById("p1");
  var target = document.getElementById("t1");
  startPage.style.opacity = "0";
  startPage.addEventListener('transitionend', function() {
    startPage.style.visibility = "hidden";
  }, { once: true });
  player.style.pointerEvents = "initial";
  player.classList.remove("standard");
  player.classList.add("fight");
  target.style.visibility = "visible";
}

function showInstr(button) {
  var instr = document.getElementById("instruction");
  button.style.display = "none";
  instr.style.display = "initial";
}