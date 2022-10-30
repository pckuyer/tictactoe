// creating the gameboard 
const gameboard = (() => {

	const playerMoves = [NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN]; // can I use gameflow reset game here?

	return{playerMoves,}
})();


//creating the player object
const Player = (biology, symbol, name, color) => {

	const makeMove = function (spot) {
		gameboard.playerMoves[spot-1] = symbol

		// color the mark. misschien niet zo netjes dat write to board in gameflow zit en color the mark hier?
		const gameboardSpots = document.querySelectorAll('.gameboardSpot');
		gameboardSpots[spot-1].style.color = color;
		gameboardSpots[spot-1].style.pointerEvents = "none"

	}

	return {biology, symbol, name, color, makeMove,};
};

//initializing players
const player1 = Player("human", "X", "Player 1", "#39ACE7");
let player2 = Player("human", "O", "Player 2", "#E91E63");


//creating the gameflow
const gameFlow = (() => {

	//keeping track of who's turn it is
	let playerToMove = player1;

	const changeTurn = function () {
		if (this.playerToMove === player1) {
			this.playerToMove = player2
		} else if (this.playerToMove === player2) {
			this.playerToMove = player1
		}

		//color underline
		// animation in other stylesheet. 
	}

	const writeToGameboard = function () {
		const gameboardSpots = document.querySelectorAll('.gameboardSpot'); //this cannot be declared in the larger function gameflow, and I don't understand why
		for (let i = 0; i < gameboard.playerMoves.length; i++) {
			if (gameboard.playerMoves[i]){
				gameboardSpots[i].innerHTML = gameboard.playerMoves[i];
			} else {
				gameboardSpots[i].innerHTML = ""
			}
		}
	}

	const checkIfOver = function () {

		//define all the axes
		const axes = {
			row1 : [0,1,2],   
			row2 : [3,4,5], 		
			row3 : [6,7,8], 
			column1 : [0,3,6],
			column2 : [1,4,7],
			column3 : [2,5,8],
			diagonal1 : [0,4,8], 
			diagonal2 : [2,4,6], 
		}

		const declareVictory = function(axis) {

			const gameboardSpots = document.querySelectorAll('.gameboardSpot'); //this cannot be declared in the larger function gameflow, and I don't understand why
			axes[axis].forEach((node) => gameboardSpots[node].style.backgroundColor = "rgba(255, 225, 255, 0.5)")

			const modalBox = document.querySelector(".modalBox"); // heb ik ook meerdere keren moeten declaren
			modalBox.innerHTML = "victory for " + gameFlow.playerToMove.name + modalBox.innerHTML;
			modalBox.style.backgroundColor = gameFlow.playerToMove.color;
		
			modalBox.style.display = "grid";
			document.querySelector("#resetButton").addEventListener("click", function () {
				gameFlow.resetGame()
			})

			gameboardSpots.forEach((spot) => spot.style.pointerEvents = "none");

		}

		const declareDraw = function() {
			// alert("draw")
			const modalBox = document.querySelector(".modalBox"); // heb ik ook meerdere keren moeten declaren
			modalBox.style.display = "grid";
			modalBox.style.backgroundColor = "white";
			modalBox.innerHTML = "Its a draw" + modalBox.innerHTML;
			document.querySelector("#resetButton").addEventListener("click", function () {
				gameFlow.resetGame()
			})

			const gameboardSpots = document.querySelectorAll('.gameboardSpot'); //this cannot be declared in the larger function gameflow, and I don't understand why
			gameboardSpots.forEach((spot) => spot.style.pointerEvents = "none");

		}

		// al dit volgende is het echte checken if over. dit kan ook in een functie. maar dan even bedenken welke check if over heet. (de grotere mishcien "ending conditions")
		const symbol = gameboard.playerMoves
		const arr = []
		let counter = 0

		// look in all axes for winning and draw conditions
		for (const axis in axes) {
			const populatedAxis = [symbol[axes[axis][0]], symbol[axes[axis][1]], symbol[axes[axis][2]] ]

			if (symbol[axes[axis][0]] === symbol[axes[axis][1]] && symbol[axes[axis][0]] === symbol[axes[axis][2]] ) {
				declareVictory(axis)
				return true;
			} else if (populatedAxis.includes("X") && populatedAxis.includes("O")) { //could also be done with a filter?
				//klopt deze if condition helemaal? soms moet ik de laatste ook nog invullen
				counter++
				if (counter === 8) {
					declareDraw()
					return true;
				}
			}
		}

	} // closing bracket for checkIfOver function

	const resetGame = function(){
		gameboard.playerMoves = [NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN];
		gameFlow.writeToGameboard();

		const modalBox = document.querySelector(".modalBox"); // heb ik ook meerdere keren moeten declaren
		//modalBox.innerHTML = modalBox.innerHTML;
		y = modalBox.childNodes[0];
		if (y.nodeName === '#text'){
			modalBox.removeChild(y);
		}
		modalBox.style.display = "none";

		const gameboardSpots = document.querySelectorAll('.gameboardSpot'); //this cannot be declared in the larger function gameflow, and I don't understand why
		gameboardSpots.forEach((spot) => spot.style.backgroundColor = "#121212")

		gameboardSpots.forEach((spot) => spot.style.pointerEvents = "auto"); //


	}

	//return
	return {playerToMove, changeTurn, writeToGameboard, checkIfOver, resetGame,}

})(); // closing bracket for gameFlow





//creating AI to play against
const AI = (() => {

	const biology = "bot";
	const symbol = "O";
	const name = "bot";
	const color = "#74E39A";

	//can this not be (partially) inherited from player
	const makeMove = function (spot) {
		const arr = gameboard.playerMoves.reduce((a, e, i) => {
			if (!e) {
				a.push(i)
			}
			return a
		}, [])	

		const random = Math.floor(Math.random() * arr.length)
		const selected = arr[random]
		gameboard.playerMoves[selected] = symbol

		// color the mark. misschien niet zo netjes dat write to board in gameflow zit en color the mark hier?
		const gameboardSpots = document.querySelectorAll('.gameboardSpot');
		gameboardSpots[selected].style.color = color;
		gameboardSpots[selected].style.pointerEvents = "none";

	}

	return {biology, symbol, name, color, makeMove,} // does symbol really need to be here?

})();



// Functions to be executed after DOM content loaded fully 
// !! This should be placed inside the gameflow. (?)
document.addEventListener("DOMContentLoaded", function () {

	//game flow
	document.querySelector(".gameboard").addEventListener("click", function () {

		const spot = event.target.id.replace("spot", "")

		if (!gameboard.playerMoves[spot-1]) {

			if (player2.biology === "human") {

				if (gameFlow.playerToMove === player1) {
					player1.makeMove(spot) 
				} else {
					player2.makeMove(spot) 
				}
				gameFlow.writeToGameboard() 
				//check if game is over
				gameFlow.checkIfOver()
				gameFlow.changeTurn() 
			} else {
				player1.makeMove(spot) 
				gameFlow.writeToGameboard() 

				//force to wait one second.
				const gameboardSpots = document.querySelectorAll('.gameboardSpot');
				gameboardSpots.forEach((spot) => spot.style.pointerEvents = "none");
				setTimeout(() => {gameboardSpots.forEach((spot) => spot.style.pointerEvents = "auto");}, 1000);		

				

				//if not over
				if (!gameFlow.checkIfOver()){
					gameFlow.changeTurn()
					player2.makeMove()
					setTimeout(() => {gameFlow.writeToGameboard(); gameFlow.checkIfOver(); gameFlow.changeTurn() }, 1000);
					
				}
			}
		} 
	})

	const changePlayer2 = function () {
		if (player2.biology === "human") {
			player2 = AI
			gameFlow.playerToMove = player1
		} else if (player2.biology === "bot") {
			player2 = Player("human", "O", "Player 2", "#E91E63");
			gameFlow.playerToMove = player1;
		}
	}

	//new player switch
	const playerSwitches = document.querySelectorAll(".playerSwitch");
	playerSwitches.forEach((playerSwitch) => {
		playerSwitch.addEventListener("click", function () {
			gameFlow.resetGame();
			changePlayer2()

		})
	})




	//taking in player names
	const namefields = document.querySelectorAll('input'); //do for both input fields
	namefields.forEach((field) => field.addEventListener('keyup', changeName));

	function changeName() {
		if (event.target.id === "player1") {
		  player1.name = event.target.value; 
		} else if (event.target.id === "player2") {
		  player2.name = event.target.value; 
		}
	}

})





// if you play against player and then against bot, the underline can go wrong. and the declare victory name and color can go wrong. 
// and if you play against bot, then win and then play against player, there is only 1 symbol (you're playing against yourself)
//it goes wrong if you change player 2 when bot is thinking. 