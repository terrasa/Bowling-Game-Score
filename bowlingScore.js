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
[1,4],
[6,2],
[7,3],
[10,3,7]
];

let result = 0;
async function jugada(rolls, index) {
	if(index == allRolls.length-1){
		if (rolls[0] == 10){
			let semiresult = 10 + rolls[1]+rolls[2];
			result = result + semiresult;
			console.log('strike =', semiresult );
		}
		else{
			let semiresult = rolls[0]+rolls[1];
			result = result + semiresult;
		console.log('<<< o spare =', semiresult );
		}
		
	}
	else{
	
	   if (rolls[0] == 10) {
		  console.log(rolls,'strike');
		  let next = index + 1;
		   if(allRolls[next][0] == 10){
			   let semiresult = 10 + allRolls[next][0]+allRolls[next+1][0] ;
			   console.log('strike =', semiresult );
			   result = result + semiresult;
			   return semiresult
		   }
		   else{
			   let semiresult = 10 + allRolls[next][0]+allRolls[next][1] ;
			   console.log('strike =', semiresult );
			   result = result + semiresult;
			   return semiresult
		   }
		  /*await jugada(allRolls[next],next);*/ 

	   }
		else if (rolls[0] + rolls[1] == 10) {
			let next = index + 1;
			semiresult = 10 + allRolls[next][0];
			result = result + semiresult;
			console.log( 'spare =', semiresult)
			return semiresult
	   }
		else {
			let semiresult = rolls[0] + rolls[1];
			result = result + semiresult;
			console.log('semiresult <<< =', semiresult );
			return semiresult
		}
 	}
}

var finalResult = allRolls.map(function(rolls,index){
   jugada(rolls,index);
	console.log('result= ',result);
})
console.log(finalResult)

