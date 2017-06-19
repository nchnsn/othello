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
**Place Piece**
**Check/Flip Pieces**
**Render Move to View**
**Update Model Based on Move**
**Start Game**
**Restart Game**
**Undo**