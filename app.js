// DOM Elements
let playingDashbord = document.querySelector('.playing-dashboard')
let winnerDashbord = document.querySelector('.winner-dashboard')
let rollbtn = document.querySelector('.btn-roll')
let holdbtn = document.querySelector('.btn-hold')
let form1 = document.querySelector('.player1-form')
let form2 = document.querySelector('.player2-form')
let diceImg = document.querySelector('.dice-image')
let uiCurrent0 = document.querySelector('.current__0')
let uiCurrent1 = document.querySelector('.current__1')
let uiScore1 = document.querySelector('.score__0')
let uiScore2 = document.querySelector('.score__1')
let gameModeDashbord = document.querySelector('.game-mode-dashbord')
let gameModes = document.querySelectorAll('.game__modes')

// Variables
let player1Name, player2Name
let allscore = [0, 0]
let currentscore = 0
let activePlayer = 0
let nonActive = 1
let gameTotalPoint = 100
let isplaying = false

// Event Listeners
form1.addEventListener('submit', (e) => {
	e.preventDefault()
	player1Name = form1.name1.value.trim()
	if (player1Name === '') {
		document.getElementById('error1').classList.add('d-block')
	} else {
		form1.classList.add('d-none')
		form2.classList.remove('d-none')
		document.querySelector(
			'.player1-ui-name'
		).textContent = `${player1Name}`
	}
	form1.reset()
})

form2.addEventListener('submit', (e) => {
	e.preventDefault()
	player2Name = form2.name2.value.trim()
	if (player2Name === '') {
		document.getElementById('error1').classList.add('d-block')
	} else {
		form2.classList.add('d-none')
		gameModeDashbord.classList.remove('d-none')
		document.querySelector(
			'.player2-ui-name'
		).textContent = `${player2Name}`
	}
	form2.reset()
})

///// Game Mode Selection
gameModes.forEach((mode) => {
	mode.addEventListener('click', (e) => {
		// Easy mode
		if (e.target.classList.contains('easy-mode')) {
			totaltime = 105
			totalProccessTime = 100
		}
		// Medium mode
		else if (e.target.classList.contains('medium-mode')) {
			totaltime = 75
			totalProccessTime = 70
		}
		// Hard mode
		else if (e.target.classList.contains('hard-mode')) {
			totaltime = 45
			totalProccessTime = 40
		}
		gameModeDashbord.classList.add('d-none')
		playingDashbord.classList.remove('d-none')
		isplaying = true
		if (isplaying) {
			timeCount()
			move()
		}
	})
})

//////////////////////////////////////// Roll Button

rollbtn.addEventListener('click', () => {
	let randomNumber = Math.floor(Math.random() * 6) + 1
	diceImg.src = `./images/dice-${randomNumber}.png`
	if (randomNumber !== 1) {
		currentscore += randomNumber
		document.querySelector(`.current__${activePlayer}`).innerHTML =
			currentscore
	} else {
		switchPlayer()
		progressbarwidth = 0
	}
})

//////////////////////////////////// Hold Button
function updateScore() {
	allscore[activePlayer] += currentscore
	document.querySelector(`.score__${activePlayer}`).innerHTML =
		allscore[activePlayer]
	if (allscore[activePlayer] > gameTotalPoint) {
		stopCount()
		stopMove()
		showresultBord()
		document.querySelector('.winner__name').innerHTML =
			activePlayer === 0 ? player1Name : player2Name
	}
	switchPlayer() // Switch player
}

holdbtn.addEventListener('click', () => {
	updateScore()
	progressbarwidth = 0
})

/////////////////////////// Switch Player
function switchPlayer() {
	document.querySelector(`.current__${activePlayer}`).innerHTML = 0
	currentscore = 0
	activePlayer = activePlayer === 0 ? 1 : 0
	nonActive = activePlayer !== 0 ? 0 : 1
	document.querySelector(`.box__${activePlayer}`).classList.add('active-box')
	document.querySelector(`.box__${nonActive}`).classList.remove('active-box')
}

//////////////////////////// Show Result Board
function showresultBord() {
	winnerDashbord.classList.add('d-flex')
	winnerDashbord.classList.remove('d-none')
	playingDashbord.classList.add('d-none')
}

/////////////////////////////////////// Timer ////////////////////////////////////

// Convert time to seconds
function convertseconds(time) {
	let min = Math.floor(time / 60)
	let seconds = time % 60
	if (seconds < 10) {
		seconds = `0${seconds}`
	}
	return `${min}:${seconds}`
}

// Variables for Timer
let uitimer = document.querySelector('.game-timer')
let totaltime
let timer

// Time Count Function
function timeCount() {
	timer = setInterval(() => {
		uitimer.innerHTML = convertseconds(totaltime) //

		if (totaltime < 15) {
			uitimer.classList.add('text-danger')
		} else if (totaltime < 30) {
			uitimer.classList.add('text-success')
			uitimer.classList.remove('text-danger')
		}

		if (totaltime === 0) {
			clearInterval(timer)
			showresultBord()
			stopMove()
			if (allscore[0] === allscore[1]) {
				document.querySelector(
					'.massege'
				).innerHTML = `<h1 class="mb-5 mt-5 font-weight-medium" style="font-size: 2.2rem">
                Both Are Equal
            </h1>`
			}
			document.querySelector('.winner__name').innerHTML =
				allscore[0] > allscore[1] ? player1Name : player2Name
		}
		totaltime--
	}, 1000)
}

// Function to Stop Counter
function stopCount() {
	clearInterval(timer)
	isplaying = false
}

///////////////////////////////////////// RESET THE GAME //////////////////////////////////////////

let btnsreset = document.querySelectorAll('.btn-reset') // Reset buttons
btnsreset.forEach((btn) => {
	btn.addEventListener('click', () => {
		uitimer.innerHTML = `00:00`
		uitimer.classList.remove('text-success')
		uitimer.classList.remove('text-danger')
		form1.classList.remove('d-none')
		winnerDashbord.classList.add('d-none')
		winnerDashbord.classList.remove('d-flex')
		playingDashbord.classList.add('d-none')
		diceImg.src = `./images/dice-${6}.png`
		document.querySelector(`.current__1`).innerHTML = 0
		document.querySelector(`.current__0`).innerHTML = 0
		document.querySelector(`.score__0`).innerHTML = 0
		document.querySelector(`.score__1`).innerHTML = 0
		document.querySelector(`.box__1`).classList.remove('active-box')
		document.querySelector(
			'.massege'
		).innerHTML = ` <img src="./images/wish.png" style="width: 143px; height: 143px" />
        <h1 class="mb-3 mt-5 font-weight-medium" style="font-size: 2.2rem">
            Congratulations
        </h1>
        <h1 class="mb-3 winner__name font-weight-bolder" style="color: #f63961"></h1>
        <h1 class="mb-5 font-weight-medium" style="font-size: 2.2rem">
            Win The Match
        </h1>`
		currentscore = 0
		activePlayer = 0
		allscore = [0, 0]
		player1Name = ''
		player2Name = ''
		totaltime = 0
		isplaying = false
		stopCount()
		stopMove()
	})
})

// Player Progress Bar
let x = 0
let progress
let progressbarwidth = 0
let totalProccessTime = 100

function move() {
	progress = setInterval(() => {
		if (progressbarwidth >= 100) {
			progressbarwidth = 0
			updateScore() // Update score when progress bar reaches 100%
		} else {
			progressbarwidth++
			document.querySelector(`.player-${activePlayer}-time`).style.width =
				progressbarwidth + '%' // Update progress bar width
			document
				.querySelector(`.player-${activePlayer}-time`)
				.classList.remove('d-none') // Show progress bar
			document
				.querySelector(`.player-${nonActive}-time`)
				.classList.add('d-none') // Hide non-active player's progress bar
		}
	}, totalProccessTime)
}

function stopMove() {
	progressbarwidth = 0
	clearInterval(progress)
}
