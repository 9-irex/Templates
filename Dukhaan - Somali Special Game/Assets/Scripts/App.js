// Public letiables
let activePlayer = 1;
let targetPaths = "";
let paths = [];
let killed = [];
let activeRow = 0;
let activeColumn = 0;
let pathReached = 0;
let redCountered = 0;
let blueCountered = 0;

// Creates All The Balls For The Board
createBall();

function createBall() {
  let dukhaan_container = document.querySelectorAll(".dukhaan_container .hall");
  dukhaan_container.forEach((element) => {
    let player = element.getAttribute("player");
    let number = element.getAttribute("number");
    let color = element.getAttribute("bg");
    let row = element.getAttribute("row");
    let col = element.getAttribute("col");
    let ball = document.createElement("div");
    let measure = element.getBoundingClientRect();
    element.classList.add("hall_" + row + "_" + col);
    if (player != undefined) {
      // Give Parent Attribute
      element.setAttribute("Parent", true);
      ball.style.position = "absolute";
      ball.style.left = measure.left + 10 + "px";
      ball.style.top = measure.top + 10 + "px";
      ball.style.width = measure.width - 20 + "px";
      ball.style.height = measure.height - 20 + "px";
      ball.style.backgroundColor = color;
      ball.style.borderRadius = "5px";
      ball.style.boxShadow = "0px 0px 2px #595959";
      ball.style.fontFamily = "poppins";
      ball.style.fontWeight = "400";
      ball.style.color = "white";
      ball.style.textAlign = "center";
      ball.style.paddingTop = "7px";
      ball.style.fontSize = "16px";
      ball.textContent = number;
      ball.classList.add("ballPlayer_" + player);
      ball.classList.add("ball_" + row + "_" + col);
      activePlayer == player ? (ball.style.cursor = "pointer") : null;
      ball.style.opacity = "1";
      ball.setAttribute("Player", player);
      ball.setAttribute("Number", number);
      ball.setAttribute("Row", row);
      ball.setAttribute("Col", col);
      document.body.appendChild(ball);

      return;
    }
    element.setAttribute("Parent", false);
  });
}

let dimeral = setInterval(() => {
  activePlayer == 1
    ? (document.querySelector(".display p").textContent = "Red Player")
    : (document.querySelector(".display p").textContent = "Blue Player");

  if (redCountered == 12) {
    document.querySelector(".display p").textContent = "Blue Player Wins";
    clearInterval(dimeral);
    restartGame();
  } else if (blueCountered == 12) {
    document.querySelector(".display p").textContent = "Red Player Wins";
    clearInterval(dimeral);
    restartGame();
  }
}, 100);

function restartGame() {
  setTimeout(() => {
    document.querySelector(".display p").textContent =
      "The Game Will Be Restarted";
    window.location.reload;
  }, 20);
}

// Listen Click Event Handler
document.querySelectorAll(".ballPlayer_1").forEach((ball) => {
  ball.addEventListener("click", function () {
    if (activePlayer == 1) {
      paths = [];
      killed = [];
      pathReached = 0;
      let row = this.getAttribute("Row");
      let col = this.getAttribute("Col");
      getPath(parseInt(row), parseInt(col));
      drawPath(parseInt(row), parseInt(col));
      moveBall();
    }
  });
});

document.querySelectorAll(".ballPlayer_2").forEach((ball) => {
  ball.addEventListener("click", function () {
    if (activePlayer == 2) {
      paths = [];
      killed = [];
      pathReached = 0;
      let row = this.getAttribute("Row");
      let col = this.getAttribute("Col");
      getPath(parseInt(row), parseInt(col));
      drawPath(parseInt(row), parseInt(col));
      moveBall();
    }
  });
});

function getPath(row, col) {
  // Get Right Paths
  if (col >= 2) {
    let path = document.querySelector(".hall_" + row + "_" + (col - 1));
    let parent = path.getAttribute("parent");
    let player = path.getAttribute("player");

    if (parent == "false") {
      paths.push([row, col - 1]);
      activeRow = row;
      activeColumn = col;
    } else {
      if (parseInt(player) != activePlayer && col > 2) {
        path = document.querySelector(".hall_" + row + "_" + (col - 2));
        parent = path.getAttribute("parent");
        player = path.getAttribute("player");

        if (parent == "false") {
          paths.push([row, col - 2]);
          activeRow = row;
          activeColumn = col;

          // Kill ball
          killed.push([row, col - 1]);
        }
      }
    }
  }
  // Get Left Paths
  if (col <= 4) {
    let path = document.querySelector(".hall_" + row + "_" + (col + 1));
    let parent = path.getAttribute("parent");
    let player = path.getAttribute("player");

    if (parent == "false") {
      pathFound = true;
      paths.push([row, col + 1]);
      activeRow = row;
      activeColumn = col;
    } else {
      if (parseInt(player) != activePlayer && col < 4) {
        path = document.querySelector(".hall_" + row + "_" + (col + 2));
        parent = path.getAttribute("parent");
        player = path.getAttribute("player");

        if (parent == "false") {
          paths.push([row, col + 2]);
          activeRow = row;
          activeColumn = col;

          // Kill ball
          killed.push([row, col + 1]);
        }
      }
    }
  }
  // Get Top Paths
  if (row >= 2) {
    let path = document.querySelector(".hall_" + (row - 1) + "_" + col);
    let parent = path.getAttribute("parent");
    let player = path.getAttribute("player");

    if (parent == "false") {
      paths.push([row - 1, col]);
      activeRow = row;
      activeColumn = col;
    } else {
      if (parseInt(player) != activePlayer && row > 2) {
        path = document.querySelector(".hall_" + (row - 2) + "_" + col);
        parent = path.getAttribute("parent");
        player = path.getAttribute("player");

        if (parent == "false") {
          paths.push([row - 2, col]);
          activeRow = row;
          activeColumn = col;

          // Kill ball
          killed.push([row - 1, col]);
        }
      }
    }
  }
  // Get Bottom Paths
  if (row <= 4) {
    let path = document.querySelector(".hall_" + (row + 1) + "_" + col);
    let parent = path.getAttribute("parent");
    let player = path.getAttribute("player");

    if (parent == "false") {
      paths.push([row + 1, col]);
      activeRow = row;
      activeColumn = col;
    } else {
      if (parseInt(player) != activePlayer && row < 4) {
        path = document.querySelector(".hall_" + (row + 2) + "_" + col);
        parent = path.getAttribute("parent");
        player = path.getAttribute("player");

        if (parent == "false") {
          paths.push([row + 2, col]);
          activeRow = row;
          activeColumn = col;

          // Kill ball
          killed.push([row + 1, col]);
        }
      }
    }
  }
}

function drawPath(row, col) {
  let path = document.querySelector(".hall_" + row + "_" + col);
  const color = path.getAttribute("bg");

  for (let i = 0; i < paths.length; i++) {
    let hall = document.querySelector(
      ".hall_" + paths[i][0] + "_" + paths[i][1]
    );

    hall.style.border = `3px solid ${color}`;
    hall.style.cursor = "pointer";
    hall.classList.add("path");
    targetPaths = document.querySelectorAll(".dukhaan_container .path");
  }
}

// Move Ball
function moveBall() {
  if (targetPaths != "") {
    targetPaths.forEach((path) => {
      path.addEventListener("click", function () {
        if (pathReached < 1) {
          const currentball = document.querySelector(
            ".ball_" + activeRow + "_" + activeColumn
          );

          const currentHall = document.querySelector(
            ".hall_" + activeRow + "_" + activeColumn
          );

          const player = currentHall.getAttribute("player");
          const number = currentHall.getAttribute("number");
          const color = currentHall.getAttribute("bg");

          this.setAttribute("player", player);
          this.setAttribute("bg", color);
          this.setAttribute("number", number);
          this.setAttribute("parent", true);
          const measure = this.getBoundingClientRect();
          currentball.style.left = measure.left + 10 + "px";
          currentball.style.top = measure.top + 10 + "px";
          currentball.style.width = measure.width - 20 + "px";
          currentball.style.height = measure.height - 20 + "px";
          currentball.setAttribute("row", this.getAttribute("row"));
          currentball.setAttribute("col", this.getAttribute("col"));
          currentball.classList.remove(
            "ball_" + activeRow + "_" + activeColumn
          );
          currentball.classList.add(
            "ball_" + this.getAttribute("row") + "_" + this.getAttribute("col")
          );
          undrwaPath();
          killed.length != 0 ? killedPlayer() : null;
          nextPlayer();
          // Update ball letiable to enable click event to the next player
          balls = document.querySelectorAll(".ballPlayer_" + activePlayer);

          // Resret Current Hall Attributes
          currentHall.setAttribute("player", "");
          currentHall.setAttribute("color", "");
          currentHall.setAttribute("number", "");
          currentHall.setAttribute("parent", false);

          // Release All Other Paths Detected
          targetPaths = "";
          pathReached++;
        }
      });
    });
  }
}

function undrwaPath() {
  for (let i = 0; i < paths.length; i++) {
    let hall = document.querySelector(
      ".hall_" + paths[i][0] + "_" + paths[i][1]
    );

    hall.style.border = "none";
    hall.style.cursor = "none";
    hall.classList.remove("path");
  }
}

function nextPlayer() {
  let balls = document.querySelectorAll(".ballPlayer_" + activePlayer);
  balls.forEach((ball) => {
    ball.style.cursor = "default";
  });

  activePlayer == 1 ? (activePlayer = 2) : (activePlayer = 1);

  balls = document.querySelectorAll(".ballPlayer_" + activePlayer);
  balls.forEach((ball) => {
    ball.style.cursor = "pointer";
  });
}

function killedPlayer() {
  for (let i = 0; i < killed.length; i++) {
    let ball = document.querySelector(
      ".ball_" + killed[i][0] + "_" + killed[i][1]
    );
    let number = ball.getAttribute("number");
    let player = ball.getAttribute("player");

    ball.classList.remove("ballPlayer_" + player);
    ball.classList.remove("ball_" + killed[i][0] + "_" + killed[i][1]);

    player == 1
      ? (player = 2) && redCountered++
      : (player = 1) && blueCountered++;
    let hall_score = document.querySelector(
      ".player_" + player + " .hall_ball_" + number
    );

    let measure = hall_score.getBoundingClientRect();

    // ball.style.left = measure.left + 5 + "px";
    // ball.style.top = measure.top + 5 + "px";
    // ball.style.width = measure.width - 10 + "px";
    // ball.style.height = measure.height - 10 + "px";
    ball.style.fontSize = "12px";
    ball.style.borderRadius = "3px";
    ball.style.paddingBottom = "10px";
    ball.style.opacity = "1";

    let t1 = gsap.timeline();
    t1.to(
      ball,
      {
        width: measure.width - 10 + "px",
        height: measure.height - 10 + "px",
      },
      0
    ).to(
      ball,
      { left: measure.left + 5 + "px", top: measure.top + 5 + "px" },
      0
    );

    let currentHall = document.querySelector(
      ".hall_" + killed[i][0] + "_" + killed[i][1]
    );
    currentHall.setAttribute("player", "");
    currentHall.setAttribute("color", "");
    currentHall.setAttribute("number", "");
    currentHall.setAttribute("parent", false);
  }
}
