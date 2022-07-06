'use strict';

// DOM ELEMENTS
const newGameEl = document.querySelector('.btn--new-game');
const modalElAll = document.querySelectorAll('.modal');
const modalEl1 = document.querySelector('#modal--1');
const modalEl2 = document.querySelector('#modal--2');
const modalEl3 = document.querySelector('#modal--3');
const overlayEl = document.querySelector('.overlay');
const modalOversEl = document.querySelector('.set-overs--details');
const modalWicketsEl = document.querySelector('.set-wickets--details');
const modalHeadBtn = document.querySelector('.btn--head');
const modalTailBtn = document.querySelector('.btn--tail');
const modalHeadTailBtn = document.querySelectorAll('.btn--coin--select');
const enterNumberBtn = document.querySelector('.btn--enter-number');
const enterNumberBoxEl = document.querySelector('.enter-number-box');
const totalOverScorebarEl = document.querySelector('.overs--total');
const userRunsEl = document.getElementById('user-runs');
const userWicketsEl = document.getElementById('user-wickets');
const robotRunsEl = document.getElementById('robot-runs');
const robotWicketsEl = document.getElementById('robot-wickets');
const scoreBarRunsEl = document.getElementById('score-bar--runs');
const scoreBarWicketsEl = document.getElementById('score-bar--wickets');
const scoreBarOversEl = document.getElementById('score-bar--overs');
const runOffBallEl = document.querySelector('.run-off-ball');
const scoreBarTargetEl = document.querySelector('.target-details');
const socreBarRunsLeftEl = document.getElementById('run-off-ball--runs');
const socreBarBallsLeftEl = document.getElementById('run-off-ball--balls');
const targetEl = document.querySelector('.target');
const userCurrentBatsmanEl = document.querySelector('#user-current-batsman');
const robotCurrentBatsmanEl = document.querySelector('#robot-current-batsman');
const userCurrentBatsmanScore = document.getElementById('current-batsman--0');
const robotCurrentBatsmanScore = document.getElementById('current-batsman--1');
const gameResultDetailsEl = document.querySelector('.game-result--details');
const userBatIcon = document.querySelector('.icon--user--bat');
const userBallIcon = document.querySelector('.icon--user--ball');
const robotBatIcon = document.querySelector('.icon--robot--bat');
const robotBallIcon = document.querySelector('.icon--robot--ball');
console.log(userBatIcon, userBallIcon, robotBatIcon, robotBallIcon);

// HEAD -> 0 TAIL -> 1
// JS Variables
let userTossChoice,
  totalOvers,
  totalBalls,
  totalWickets,
  coinOutcome,
  userBatting,
  tossDone;

let innings,
  currentBatsmanScore,
  currentWicket,
  currentBalls,
  target,
  userTotalScore,
  robotTotalScore,
  userWicket,
  robotWicket,
  remainingRun,
  remainingBall;

// FUNCTION EXPRESSIONS

const init = function () {
  totalOvers = 5;
  totalBalls = 30;
  totalWickets = 10;
  tossDone = false;
  innings = 1;
  currentBatsmanScore = 0;
  currentWicket = 0;
  currentBalls = 0;
  target = 0;
  userTotalScore = 0;
  robotTotalScore = 0;
  userWicket = 0;
  robotWicket = 0;
  remainingRun = 0;
  remainingBall = 0;

  // inititally score-bar's target  and run off ball should be hidden
  targetEl.classList.add('hidden');
  runOffBallEl.classList.add('hidden');

  scoreBarOversEl.textContent = '0';
  scoreBarRunsEl.textContent = '0';
  scoreBarWicketsEl.textContent = '0';
  scoreBarOversEl.textContent = '0';

  userRunsEl.textContent = '0';
  userWicketsEl.textContent = '0';
  robotRunsEl.textContent = '0';
  robotWicketsEl.textContent = '0';

  userCurrentBatsmanScore.textContent = '0';
  robotCurrentBatsmanScore.textContent = '0';

  for (let i = 0; i <= 6; i++) {
    document.querySelector(`.icon--user--${i}`).classList.add('hidden');
    document.querySelector(`.icon--robot--${i}`).classList.add('hidden');
  }
  userBatIcon.classList.add('hidden');
  userBallIcon.classList.add('hidden');
  robotBatIcon.classList.add('hidden');
  robotBallIcon.classList.add('hidden');

  enterNumberBtn.textContent = 'hit';
};

const openModal1 = function () {
  modalEl1.classList.remove('hidden');
  overlayEl.classList.remove('hidden');
};

const closeModal1 = function () {
  modalEl1.classList.add('hidden');
  overlayEl.classList.add('hidden');
};

const openModal2 = function () {
  modalEl2.classList.remove('hidden');
  overlayEl.classList.remove('hidden');
};

const closeModal2 = function () {
  modalEl2.classList.add('hidden');
  overlayEl.classList.add('hidden');
};

const openModal3 = function () {
  modalEl3.classList.remove('hidden');
  overlayEl.classList.remove('hidden');
};

const closeModal3 = function () {
  modalEl3.classList.add('hidden');
  overlayEl.classList.add('hidden');
};

const doToss = function () {
  // set overs and wickets
  tossDone = true;
  totalOvers = Number(modalOversEl.value);
  totalBalls = 6 * totalOvers;
  totalWickets = Number(modalWicketsEl.value);
  totalOverScorebarEl.textContent = totalOvers;

  // do the toss and check result
  coinOutcome = Math.trunc(Math.random() * 2);
  userTossChoice = this.classList.contains('btn--head') ? 0 : 1;
  // user gets modal2 to see opponent's decision
  closeModal1();
  openModal2();
  if (coinOutcome === userTossChoice) {
    // user gets modal2 to decide
    document.querySelector('.toss--won').classList.remove('hidden');
    document.querySelector('.toss--lost').classList.add('hidden');
    document.getElementById('press-esc--toss').classList.add('hidden');

    // now choose bat or field
    const batBtn = document.querySelector('#btn--bat');
    const fieldBtn = document.querySelector('#btn--field');
    batBtn.addEventListener('click', function () {
      userBatting = true;
      enterNumberBtn.textContent = 'hit';
      closeModal2();
    });
    fieldBtn.addEventListener('click', function () {
      userBatting = false;
      enterNumberBtn.textContent = 'bowl';
      closeModal2();
    });
  } else {
    // computer gets modal2 to decide
    // 0 -> bat, 1 -> field
    document.querySelector('.toss--won').classList.add('hidden');
    document.querySelector('.toss--lost').classList.remove('hidden');
    document.getElementById('press-esc--toss').classList.remove('hidden');

    // now computer chooses bat or field
    let computerChoice = Math.trunc(Math.random() * 2);

    if (computerChoice === 0) {
      // computer will bat now
      userBatting = false;
      enterNumberBtn.textContent = 'bowl';
      document.querySelector('.toss-decision-robot').textContent = 'bat';
    } else {
      // comupter will field now
      userBatting = true;
      enterNumberBtn.textContent = 'hit';
      document.querySelector('.toss-decision-robot').textContent = 'field';
    }
  }

  if (userBatting) {
    document.querySelector('.team--0').classList.add('team--active');
    document.querySelector('.team--1').classList.remove('team--active');
    userBatIcon.classList.remove('hidden');
    robotBallIcon.classList.remove('hidden');
    userBallIcon.classList.add('hidden');
    robotBatIcon.classList.add('hidden');
  } else {
    document.querySelector('.team--0').classList.remove('team--active');
    document.querySelector('.team--1').classList.add('team--active');
    userBallIcon.classList.remove('hidden');
    robotBatIcon.classList.remove('hidden');
    userBatIcon.classList.add('hidden');
    robotBallIcon.classList.add('hidden');
  }
};

const checkTarget = function () {
  if (userBatting) {
    remainingRun = target - userTotalScore;
  } else {
    remainingRun = target - robotTotalScore;
  }
  remainingBall = totalBalls - currentBalls;

  if (remainingRun <= 0) {
    // target achieved
    innings++;
    if (userBatting) {
      gameResultDetailsEl.textContent = `HUMAN CITY WON BY ${
        totalWickets - currentWicket
      } WICKETS`;
    } else {
      gameResultDetailsEl.textContent = `ROBOT CITY WON BY ${
        totalWickets - currentWicket
      } WICKETS`;
    }
    openModal3();
  } else {
    // target not achieved yet

    // check if got all out
    if (currentWicket === totalWickets) {
      if (remainingRun === 1) {
        // check if match drawn
        gameResultDetailsEl.textContent = 'MATCH TIED!';
      } else {
        if (userBatting) {
          // user lost
          gameResultDetailsEl.textContent = `ROBOT CITY WON BY ${
            target - userTotalScore - 1
          } runs`;
        } else {
          // robot lost
          gameResultDetailsEl.textContent = `HUMAN CITY WON BY ${
            target - robotTotalScore - 1
          } runs`;
        }
      }
      openModal3();
    } else {
      // game on
      // update score bar remaining runs and balls
      socreBarRunsLeftEl.textContent = remainingRun;
      socreBarBallsLeftEl.textContent = remainingBall;
    }
  }
};

const updateOver = function () {
  const over = Math.floor(currentBalls / 6);
  const ball = currentBalls % 6;
  // console.log(over, ball);
  if (ball === 0) {
    scoreBarOversEl.textContent = `${over}`;
  } else {
    scoreBarOversEl.textContent = `${over}.${ball}`;
  }
};

const changeInnings = function () {
  // if current innings is 2, means overs are done, score not achieved
  if (innings >= 2) {
    innings++;
    if (userBatting && remainingRun > 0) {
      // user lost
      gameResultDetailsEl.textContent = `ROBOT CITY WON BY ${
        target - userTotalScore - 1
      } RUNS`;
    } else if (!userBatting && remainingRun > 0) {
      // robot lost
      gameResultDetailsEl.textContent = `HUMAN CITY WON BY ${
        target - robotTotalScore - 1
      } RUNS`;
    }
    openModal3();
    return;
  }

  // if innings is 1, set target to start new innings
  if (userBatting) target = userTotalScore + 1;
  else target = robotTotalScore + 1;

  // set current batsman score, current ball to 0, wickets to 0, score bar score and wicket and overs to 0, make target in score bar visible and update;

  currentBatsmanScore = 0;
  currentBalls = 0;
  currentWicket = 0;
  scoreBarRunsEl.textContent = '0';
  scoreBarWicketsEl.textContent = '0';
  scoreBarTargetEl.textContent = target;
  socreBarRunsLeftEl.textContent = target;
  socreBarBallsLeftEl.textContent = totalBalls;
  scoreBarOversEl.textContent = '0';

  // making target and run off ball visible for 2nd innings in score-bar
  targetEl.classList.remove('hidden');
  runOffBallEl.classList.remove('hidden');

  // toggle userBatting state
  userBatting = !userBatting;

  if (userBatting) {
    document.querySelector('.team--0').classList.add('team--active');
    document.querySelector('.team--1').classList.remove('team--active');

    userBatIcon.classList.remove('hidden');
    robotBallIcon.classList.remove('hidden');
    userBallIcon.classList.add('hidden');
    robotBatIcon.classList.add('hidden');
  } else {
    document.querySelector('.team--1').classList.add('team--active');
    document.querySelector('.team--0').classList.remove('team--active');

    userBallIcon.classList.remove('hidden');
    robotBatIcon.classList.remove('hidden');
    userBatIcon.classList.add('hidden');
    robotBallIcon.classList.add('hidden');
  }
  userCurrentBatsmanScore.textContent = '0';
  robotCurrentBatsmanScore.textContent = '0';

  // toggle text in enter text button
  if (userBatting) {
    enterNumberBtn.textContent = 'hit';
  } else {
    enterNumberBtn.textContent = 'bowl';
  }

  // increase innings to go to 2nd innings
  innings++;
  console.log('innigs change', innings);
};

const play = function () {
  // if innigs greater than 2, it means game is over
  if (innings > 2 || !tossDone) return;

  // userNumber should be in the range 0 to 6 inclusive
  const userNumber = Number(enterNumberBoxEl.value) % 7;
  const robotNumber = Math.trunc(Math.random() * 7);

  for (let i = 0; i <= 6; i++) {
    // let className = `icon--${i}`;
    document.querySelector(`.icon--user--${i}`).classList.add('hidden');
    document.querySelector(`.icon--robot--${i}`).classList.add('hidden');
  }
  document
    .querySelector(`.icon--user--${userNumber}`)
    .classList.remove('hidden');
  document
    .querySelector(`.icon--robot--${robotNumber}`)
    .classList.remove('hidden');

  currentBalls++;

  console.log(userNumber, robotNumber);

  // update score bar's over
  updateOver();

  if (userNumber === robotNumber) {
    // its OUT
    currentBatsmanScore = 0;
    currentWicket++;

    if (userBatting) {
      //update user's wicket
      userWicketsEl.textContent = currentWicket;
      userCurrentBatsmanScore.textContent = '0';
    } else {
      //update robot's wicket
      robotWicketsEl.textContent = currentWicket;
      robotCurrentBatsmanScore.textContent = '0';
    }

    // update score bar's wicket
    scoreBarWicketsEl.textContent = currentWicket;
  } else {
    if (userBatting) {
      // add userNumber as score to user
      currentBatsmanScore += userNumber;
      userTotalScore += userNumber;

      // update user's total score
      userRunsEl.textContent = userTotalScore;

      // update current batsman score
      userCurrentBatsmanScore.textContent = currentBatsmanScore;

      // update scorebar
      scoreBarRunsEl.textContent = userTotalScore;
    } else {
      // add robotNumber as score to robot
      currentBatsmanScore += robotNumber;
      robotTotalScore += robotNumber;

      //update robot's total score
      robotRunsEl.textContent = robotTotalScore;

      // update current batsman score
      robotCurrentBatsmanScore.textContent = currentBatsmanScore;

      //update scorebar
      scoreBarRunsEl.textContent = robotTotalScore;
    }
  }

  // if innings is 2, check if target achieved or got all out and update run off ball
  if (innings === 2) {
    checkTarget();
  }

  // check for innings change
  if (currentBalls === totalBalls || currentWicket === totalWickets) {
    changeInnings();
  }
};

// open modal1 and reset on clicking new game
newGameEl.addEventListener('click', function () {
  init();
  openModal1();
});

//close modal1 or modal2 or modal3 on clicking outside modal or esc
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modalEl1.classList.contains('hidden')) {
    closeModal1();
  } else if (e.key === 'Escape' && !modalEl2.classList.contains('hidden')) {
    closeModal2();
  } else if (e.key == 'Escape' && !modalEl3.classList.contains('hidden')) {
    closeModal3();
  }
});
overlayEl.addEventListener('click', closeModal1);
overlayEl.addEventListener('click', closeModal2);
overlayEl.addEventListener('click', closeModal3);

// take input of overs and wickets when clicked head or tail and close modal1 and
// do toss and open modal2 to show result
modalHeadBtn.addEventListener('click', doToss);
modalTailBtn.addEventListener('click', doToss);

//Dont start match if toss is not done
// start first innings
enterNumberBtn.addEventListener('click', play);

// *********** Start Playing ************ //
init();
