

document.addEventListener("DOMContentLoaded", function () {


	//animations for changing player2 from human to bot and back
	const a = document.querySelector(".spanA");
	const b = document.querySelector(".spanB");
	let counter = 0
	
		const down1 = a.animate([
  			// keyframes
			{ transform: 'translateY(0px)', opacity: 1 },
			{ transform: 'translateY(-30px)', opacity: 0 }
		], {
			// timing options
			duration: 1000,
			iterations: 1
		});

		const down2 = b.animate([
  			// keyframes
			{ transform: 'translateY(30px)', opacity: 0 },
			{ transform: 'translateY(0px)', opacity: 1 }
		], {
			// timing options
			duration: 1000,
			iterations: 1,
		});

		down1.pause()
		down2.pause()


	const aX = document.querySelector(".spanA").querySelector("i")
	aX.addEventListener("click", () => {

		if (counter === 0) {
			down1.play()
			down2.play()
			counter++
		} else {
			down1.reverse()
			down2.reverse()
		}
		// check if you can reverse without playing (maybe by setting a variable within the animation)
		//this would allow the deletion of the counter. 

		setTimeout(function () {
			a.style = "opacity: 0; transform: translateY(-30px);";
			b.style = "opacity: 1; transform: translateY(0px);";
		}, 1000);
	});


	const bX = document.querySelector(".spanB").querySelector("i")
	bX.addEventListener("click", () => {

		down1.reverse()
		down2.reverse()


		setTimeout(function () {
			a.style = "opacity: 1; transform: translateY(0px);";
			b.style = "opacity: 0; transform: translateY(30px);";
		}, 1000);
	});
 	

});


	
