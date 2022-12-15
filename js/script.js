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
  var playerContainer = document.getElementById("p" + turn);
  var player = playerContainer.querySelector('.fight');
  var enemyContainer = document.getElementById("p" + (turn % 2 + 1));
  var enemy = enemyContainer.querySelector('.fight');

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
      enemyContainer.querySelector('.standard').style.display = "none";
      enemyContainer.querySelector('.cry').style.display = "block";
      health[turn - 1] -= 10;
      hp.style.width = health[turn - 1] + "%";
      if (health[turn - 1] <= 20) {
        hp.style.backgroundColor = "red";
      }
      else if (health[turn - 1] <= 50) {
        hp.style.backgroundColor = "var(--orange)";
      }
      enemyContainer.querySelector('.cry').addEventListener('animationend', function() {
        enemyContainer.querySelector('.cry').style.display = "none";
        enemy.style.display = "block";
        enemy.style.pointerEvents = "initial";
        console.log(enemy.style.display);
        target.style.visibility = "visible";
        player.style.display = "none";
        playerContainer.querySelector('.standard').style.display = "block";
      }, { once: true });
    }
    else {
      enemy.style.pointerEvents = "initial";
      enemyContainer.querySelector('.standard').style.display = "none";
      target.style.visibility = "visible";
      enemy.style.display = "block";
      player.style.display = "none";
      playerContainer.querySelector('.standard').style.display = "block";
    }
    force.value = 0;
  }, { once: true });
}

function startGame() {
  var startPage = document.getElementById("start-page");
  var playerContainer = document.getElementById("p1");
  var player = playerContainer.querySelector('.fight');
  var target = document.getElementById("t1");
  startPage.style.opacity = "0";
  startPage.addEventListener('transitionend', function() {
    startPage.style.visibility = "hidden";
  }, { once: true });
  playerContainer.querySelector('.standard').style.display = "none";
  player.style.pointerEvents = "initial";
  player.style.display = "block";
  target.style.visibility = "visible";
}

function showInstr(button) {
  var instr = document.getElementById("instruction");
  button.style.display = "none";
  instr.style.display = "initial";
}