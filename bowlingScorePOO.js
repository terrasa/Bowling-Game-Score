// If all pins (10) drop in the first roll = strike, 10 points + the next 2 rolls score
// If all pins drop in the second roll = spare, 10 points + the next roll score
// if no 10 pins drop, frist roll + second roll

const allFrames = [
    [1,2],
    [10,false],
    [5,4],
    [7,3],
    [10,false],
    [10,false],
    [1,4],
    [6,2],
    [7,3],	 		/* [10,false] [10,2] */
    [10,3,7]	  	/* [3,7,2] [1,3] [10,3,7] */
    ];


class Frame{
    constructor(allFrames, frameNumber){
        this.allFrames = allFrames
        this.firstRoll = allFrames[frameNumber][0];
        this.secondRoll = allFrames[frameNumber][1];
        if(frameNumber == 9) this.thirdRoll = allFrames[frameNumber][2]
        this.frameNumber = frameNumber

        this.isStrike = function () {
            if (this.firstRoll == 10) return true
            return false
        }
		
        this.isSpare = function() {
            if(this.secondRoll) {
				if(this.firstRoll + this.secondRoll == 10)
                 return true
            	}
            	return false
        }

        this.isLastFrame = function() {  // LastFrame is this.allFrames.length-1
            if (this.frameNumber == 9) return true
            return false
        }
		
		this.isBeforeLastFrame = function (){
            if (this.frameNumber == 8) return true
            return false
        }
		
        this.score = function(){
            if(this.isLastFrame()) {

                if(this.isStrike()){
                    const result = 10 + this.secondRoll + this.thirdRoll
					console.log('isLastFrame y Strike');
                    return result 
                } 

                else if(this.isSpare()){
                    const result = this.firstRoll + this.secondRoll + this.thirdRoll
                    console.log('isLastFrame y Spare');
                    return result
                }

                else{
                    const result = this.firstRoll + this.secondRoll
                    console.log('isLastFrame - NO Spare - NO Strike');
                    return result
                }
            }
            
            if(!this.isStrike() && !this.isSpare()){
                console.log('NO Spare - NO Strike');
                return this.firstRoll + this.secondRoll
            }
			
			if (this.isBeforeLastFrame()){                          
                if(this.isStrike()){
					console.log('Strike Before Last Frame');   
                    const nextRolls = this.allFrames[this.frameNumber+1]
                    const nextFrame = new Frame(this.allFrames, this.frameNumber+1)
                    return 10 + nextFrame.firstRoll + nextFrame.secondRoll
                    
                }   
            }
			
            if(this.isSpare()){
                const nextRolls = this.allFrames[this.frameNumber+1]
                const nextFrame = new Frame(this.allFrames, this.frameNumber+1)
				console.log('Spare');
                return 10 + nextFrame.firstRoll
            }
			
			if(this.isStrike()){
				const nextRolls = this.allFrames[this.frameNumber+1]
                const nextFrame = new Frame(this.allFrames, this.frameNumber+1)
				if(nextFrame.firstRoll != 10){
					
					console.log('strike  y siguiente !=10');
					return 10 + nextFrame.firstRoll + nextFrame.secondRoll
				}
				else{
					const secondNextRolls = this.allFrames[this.frameNumber+2]
                	const SecondNextFrame = new Frame(this.allFrames, this.frameNumber+2)
					console.log('strike  y siguiente 10');
					return 10 + nextFrame.firstRoll + SecondNextFrame.firstRoll
				}
			}
        }
    }
}

/*const aCase1 = new Frame(allFrames,0)
const aCase2 = new Frame(allFrames,1)
const aCase3 = new Frame(allFrames,2)
const aCase4 = new Frame(allFrames,3)
const aCase5 = new Frame(allFrames,4)
const aCase6 = new Frame(allFrames,5)
const aCase7 = new Frame(allFrames,6)
const aCase8 = new Frame(allFrames,7)
const aCase9 = new Frame(allFrames,8)
const aCase10 = new Frame(allFrames,9)



console.log(aCase1.score());
console.log(aCase2.score());
console.log(aCase3.score());
console.log(aCase4.score());
console.log(aCase5.score());
console.log(aCase6.score());
console.log(aCase7.score());
console.log(aCase8.score());
console.log(aCase9.score());
console.log(aCase10.score());*/

var finalResult = allFrames.map(function(element,index){
	const aCase = new Frame(allFrames,index)
	return aCase.score();
})

console.log(finalResult);

const finalScore = finalResult.reduce((a,b) => a + b, 0);

console.log('Score = ', finalScore);