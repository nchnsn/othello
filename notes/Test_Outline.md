# 
#code
# *Test Outline*
**## Model**
**Player Turn:** Black, White
* _Check first 4 moves of the game to make sure turns go 'white, black, white, black'_
**Board Position:** Array of 8 arrays containing the piece status of each square i.e. black, white, or empty.
* _Board arr length is always 8 and each sub array is also 8_
* _Make sure the value of each element in sub array matches the corresponding piece selected each turn_
**White Score:** Number of white pieces on the board
* _White score equals all of the white values in the board array_
**Black Score:** number of black pieces on the board
* _Black score equals all of the black values in the board array_
**History:** History of all other info in the model so you can 'undo' turns
* _History arr length equals number total score (white and black pieces)_

**## View**
**Board:** The visual table on screen representing the board
* _Number of columns = 8_
* _Number of rows = 64_
* _Size of each cell is 100px by 100px_
**Pieces:** The black or white pieces available on screen
* _Number of black and white pieces match the number of black_white elements in model/
**Scoreboard:** Area of the webpage showing user relevant info from the model including current score and who's turn.
* _All the values in the scoreboard match the equivalent values in the model_
**Header:** Includes game title and option to undo move or restart game. 
* _Header text = 'reversi'_

## Controller
**Place Piece**
* _Should call render function and update model function_
**Check/Flip Pieces**
**Render Move to View**
* _Board square in View clicked, should have css property of color who's turn_ 
**Update Model Based on Move**
* _History arr length should be + 1_
* _Total score should be +1_
* _Board square in model should match board square clicked on in view, should match color of who's turn_
**Start Game**
* _Score should be 2 - 2_
* _Should be whites turn_
* _History arr length should be 4_
**Restart Game**
* _Passes same tests as 'start game'_
**Undo**
* _Turn should be not the current players turn_
* _History arr length should be -1_
* _Total score should be -1_