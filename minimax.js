
const emptyGameArr = [NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN];
const gameArr = ["X", "O", "X", "O", "X", "O", "X", "O","X"];

const printBoard = function (gameArr) {
	let chunk;
	while (gameArr.length > 0) {
		chunk = gameArr.splice(0,3)
		console.log(chunk)
	}
};


// xxxxxxxxxxxxxxxx

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

// console.log(valueGame(gameArr))
// printBoard(gameArr)

const miniMax = function (gameArr, depth, isMaxPlayer) {
	//if end of game
	if (valueGame(emptyGameArr)) {
		valueGame(emptyGameArr)
	} else if (){

	}
}
