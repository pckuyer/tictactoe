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
		return "0";
	}
} // end of value game



const miniMax = function (gameArr, isMaxPlayer) {

	if (valueGame(gameArr)) {
		return {"value" : valueGame(gameArr)}

	} else {

		const values = []

		//max player
		if (isMaxPlayer) {
			
			// const values = []

			gameArr.forEach((e,i,a) => {
				if (!e){
					a[i] = "O"
					const obj = {
						"index" : i,
						"value": miniMax(a.slice(0), false).value
					}
					values.push(obj)
					a[i] = NaN
				}
			})

			const max = values.reduce((x, y) => x.value > y.value ? x : y);
			return max



		//min player
		} else if (!isMaxPlayer) {

			// const values = []

			gameArr.forEach((e,i,a) => {
				if (!e){
					a[i] = "X"
					const obj = {
						"index" : i,
						"value": miniMax(a.slice(0), true).value
					}
					values.push(obj)
					a[i] = NaN
				}
			})
			
			const min = values.reduce((x, y) => x.value < y.value ? x : y);
			return min
		}

	}//end of else (not a value)
} // end of minimax function







