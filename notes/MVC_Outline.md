# 
#code
# *MVC Outline*
## Model
**Player Turn:** Black, White

**Board Position:** Array of 8 arrays containing the piece status of each square i.e. black, white, or empty.

**White Score:** Number of white pieces on the board

**Black Score:** number of black pieces on the board

**History:** History of all other info in the model so you can 'undo' turns

## View
**Board:** The visual table on screen representing the board

**Pieces:** The black or white pieces available on screen

**Scoreboard:** Area of the webpage showing user relevant info from the model including current score and who's turn.

**Header:** Includes game title and option to undo move or restart game. 

## Controller
**Place Piece** Function that puts a piece down when a user clicks and calls neccessary functions to update model/view.

**Check/Flip Pieces** Function that checks and flips pieces on each move.

**Render Move to View** Function called when piece is placed that updates the piece to the view. 

**Update Model Based on Move** Function called when piece is placed that updates the piece to the model. 

**Start Game** Function that sets up the first 4 pieces and score when a new game is started.

**Restart Game** Function that clears the board and starts game again.

**Undo** Function that puts game back to the state before the last move. 
