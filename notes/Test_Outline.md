# 
# *Test Outline*
_This is an outline of the potential tests I can start with to run for each component of my app, organized by MVC_
## Model
**Player Turn:** Black, White

* Check first 4 moves of the game to make sure turns go 'white, black, white, black'

**Board Position:** Array of 8 arrays containing the piece status of each square i.e. black, white, or empty.

* Board arr length is always 8 and each sub array is also 8
* Make sure the value of each element in sub array matches the corresponding piece selected each turn

**White Score:** Number of white pieces on the board

* White score equals all of the white values in the board array.

**Black Score:** number of black pieces on the board

* Black score equals all of the black values in the board array.

**History:** History of all other info in the model so you can 'undo' turns

* History arr length equals number total score (white and black pieces).

## View
**Board:** The visual table on screen representing the board

* Number of columns = 8
* Number of rows = 64
* Size of each cell is 100px by 100px

**Pieces:** The black or white pieces available on screen

* Number of black and white pieces match the number of black_white elements in model

**Scoreboard:** Area of the webpage showing user relevant info from the model including current score and who's turn.

* All the values in the scoreboard match the equivalent values in the model

**Header:** Includes game title and option to undo move or restart game. 

* Header text = 'reversi'

## Controller
**Place Piece**

* Should call render function and update model function

**Check/Flip Pieces**

**Render Move to View**

* Board square in View clicked, should have css property of color who's turn

**Update Model Based on Move**

* History arr length should be + 1
* Total score should be +1
* Board square in model should match board square clicked on in view, should match color of who's turn

**Start Game**

* Score should be 2 - 2.
* Should be whites turn.
* History arr length should be 4.

**Restart Game**

* Passes same tests as 'start game'

**Undo**

* Turn should be not the current players turn
* History arr length should be -1
* Total score should be -1
