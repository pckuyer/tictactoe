//two arrays for testing purposes
const emptyGameArr = [NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN];
const gameArr = [NaN, NaN, NaN, "O", "X", "O", "X", "O","X"];
const fullGameArr = ["X", "O", "X", "O", "X", "O", "X", "O","X"];


//function to visually print board
const printBoard = function (gameArr) {
	let chunk;
	while (gameArr.length > 0) {
		chunk = gameArr.splice(0,3)
		console.log(chunk)
	}
};


//function to value the game
const valueGame = function (gameArr) {

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

	for (const axis in axes) {
		if (gameArr[axes[axis][0]] === gameArr[axes[axis][1]] && gameArr[axes[axis][0]] === gameArr[axes[axis][2]] ) {
			if (gameArr[axes[axis][0]] === "O") {
			 	return 10;
			 } else if (gameArr[axes[axis][0]] === "X") {
			 	return -10;
			 }
		} 
	}
	if (!gameArr.includes(NaN)) {
		return 0;
	}
} // end of value game



//acutal minimax function  
//depth deleted for now
const miniMax = function (gameArr, isMaxPlayer) {
	//if end of game
	if (valueGame(gameArr)) {
		console.log(valueGame(gameArr))
		return valueGame(gameArr)
	} else {

		if (isMaxPlayer) {
			
			//get all empty spots. For each: fill with O, call minimax and restore. 
			gameArr.map(function(e, i, a) {
				if(!e){
					a[i] = "O"
					console.log(a)
					miniMax(a, false)
					a[i] = e
				}
			})

		} else if (!isMaxPlayer) {
			gameArr.map(function(e, i, a) {
				if(!e){
					a[i] = "X"
					console.log(a)
					miniMax(a, true)
					a[i] = e
				}
			})
		}
	}
}

const result = miniMax(gameArr, true);
console.log(result);










