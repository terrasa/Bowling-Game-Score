// If all pins (10) drop in the first roll = strike, 10 points + the next 2 rolls score
// If all pins drop in the second roll = spare, 10 points + the next roll score
// if no 10 pins drop, frist roll + second roll

var allRolls = [
[1,2],
[10,false],
[5,4],
[7,3],
[10,false],
[10,false],
[10,false],
[10,false],
[1,4],
[6,2],
[7,3],
[10,3,7]
];

const isStrike = function(roll_1, index){
		if (roll_1 == 10){
			let next = index + 1;
		   	if(allRolls[next][0] == 10){
				let semiresult = 10 + allRolls[next][0]+allRolls[next+1][0] ;
			   	console.log('strike =', semiresult );
				return semiresult
		   	}
			else{
			   let semiresult = 10 + allRolls[next][0]+allRolls[next][1] ;
			   console.log('strike =', semiresult );
			   return semiresult
		   }
		}
	} 

class Frame {
    constructor(position,index, method){
        this.roll_1 = position[0];
		this.roll_2 = position[1];
		this.method = method;
    }
}

const newPlay = new Frame(allRolls[1], 1, isStrike);
console.log(newPlay);
console.log(newPlay.method(10, 1));


function jugada(rolls, index) {
	if(index == allRolls.length-1){
		if (rolls[0] == 10){
			let semiresult = 10 + rolls[1]+rolls[2];
			console.log('strike =', semiresult );
			return semiresult;
		}
		else{
			let semiresult = rolls[0]+rolls[1];
			console.log('<<< o spare =', semiresult );
			return semiresult;
		}
	}
	else{
	
	   if (rolls[0] == 10) {
		  console.log(rolls,'strike');
		  let next = index + 1;
		   if(allRolls[next][0] == 10){
			   let semiresult = 10 + allRolls[next][0]+allRolls[next+1][0] ;
			   console.log('strike =', semiresult );
			   return semiresult
		   }
		   else{
			   let semiresult = 10 + allRolls[next][0]+allRolls[next][1] ;
			   console.log('strike =', semiresult );
			   return semiresult
		   }
	   }
		else if (rolls[0] + rolls[1] == 10) {
			let next = index + 1;
			semiresult = 10 + allRolls[next][0];
			console.log( 'spare =', semiresult)
			return semiresult
	   }
		else {
			let semiresult = rolls[0] + rolls[1];
			console.log('semiresult <<< =', semiresult );
			return semiresult
		}
 	}
}
var finalResult = allRolls.map(function(rolls,index){
	return jugada(rolls,index);
})
console.log(finalResult);
const finalScore = finalResult.reduce((a,b) => a + b, 0);
console.log('Score = ', finalScore);