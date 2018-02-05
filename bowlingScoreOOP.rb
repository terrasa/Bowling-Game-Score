# If all pins (10) drop in the first roll = strike, 10 points + the next 2 rolls score
# If all pins drop in the second roll = spare, 10 points + the next roll score
# if no 10 pins drop, frist roll + second roll

allFrames = [
    [1,2],
    [10,nil],
    [5,4],
    [7,3],
    [10,nil],
    [10,nil],
    [1,4],
    [6,2],
    [7,3],	 		# [7,3][10,nil] [10,2] 
    [10,3,7]	  	# [10,3,7] [3,7,2] [1,3] 
    ];

class Frame
	attr_accessor :allFrames, :frameNumber, :firstRoll, :secondRoll, :thirdRoll
	def initialize(allFrames, frameNumber)
        @allFrames = allFrames
		@frameNumber = frameNumber
        @firstRoll = @allFrames[@frameNumber][0];
        @secondRoll = @allFrames[@frameNumber][1];
        if @frameNumber == 9 
			@thirdRoll = @allFrames[@frameNumber][2]
		end
	end
		
	def isStrike 
    	if @firstRoll == 10
			return true
		else
			return false
		end
	end
     		
    def isSpare
		if @secondRoll
			if @firstRoll + @secondRoll == 10
            	return true
			else
            	return false
			end
		end
	end

    def isLastFrame      # LastFrame is @allFrames.length-1
         if @frameNumber == 9
			 return true
		 else
            return false
		 end
	end
		
	def isBeforeLastFrame
    	if @frameNumber == 8
			return true
		else
			return false
		end
	end
		
    def score
    	if isLastFrame		
			if isStrike
				result = 10 + secondRoll + thirdRoll
                return result
					
        	elsif isSpare
				result = firstRoll + secondRoll + thirdRoll
				return result
			else
            	result = firstRoll + secondRoll
                return result
			end
		end
		
		if isStrike == false && isSpare == false  
            return firstRoll + secondRoll
		end 
            			
		if isBeforeLastFrame                          
        	if isStrike 
                nextRolls = @allFrames[@frameNumber+1]
				nextFrame = Frame.new(@allFrames, @frameNumber+1)
                return 10 + nextFrame.firstRoll + nextFrame.secondRoll
			end
		end
			
        if isSpare
        	nextRolls = @allFrames[@frameNumber+1]
            nextFrame = Frame.new(@allFrames, @frameNumber+1)
            return 10 + nextFrame.firstRoll
		end
            
			
		if isStrike
			nextRolls = @allFrames[@frameNumber+1]
            nextFrame = Frame.new(@allFrames, @frameNumber+1)
			unless nextFrame.firstRoll == 10
				return 10 + nextFrame.firstRoll + nextFrame.secondRoll	
			else
				secondNextRolls = @allFrames[@frameNumber+2]
               	secondNextFrame = Frame.new(@allFrames, @frameNumber+2)
				return 10 + nextFrame.firstRoll + secondNextFrame.firstRoll
			end
		end		
	end
end

finalResult = Array.new

allFrames.each_with_index {|item, index|
	aCase = Frame.new(allFrames, index)
	finalResult.push(aCase.score)
	print "frame #{index} - #{aCase.score}\n"
	}

finalScore = finalResult.reduce(:+) 


print "Score = #{finalScore}"