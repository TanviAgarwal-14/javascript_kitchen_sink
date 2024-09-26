var Knight = function(config, board) {
    this.type = 'knight';
    this.board = board; // Store a reference to the board
    this.constructor(config);
};

Knight.prototype = new Piece({});

Knight.prototype.isValidMove = function(targetPosition) {
    let currentCol = this.position.charCodeAt(0) - 65; // Convert A-H to 0-7
    let currentRow = parseInt(this.position.charAt(1)) - 1; // Convert 1-8 to 0-7
    let targetCol = targetPosition.col.charCodeAt(0) - 65;
    let targetRow = parseInt(targetPosition.row) - 1;

    // Calculate the difference in columns and rows
    let colDiff = Math.abs(targetCol - currentCol);
    let rowDiff = Math.abs(targetRow - currentRow);

    // Check if the move is a valid L-shape
    if (!((colDiff === 2 && rowDiff === 1) || (colDiff === 1 && rowDiff === 2))) {
        console.warn("Invalid move for knight: not an L-shape");
        return false;
    }

    // Check if there's a piece at the target position
    let pieceAtTarget = this.board.getPieceAt(targetPosition);
    if (pieceAtTarget) {
        if (pieceAtTarget.color === this.color) {
            console.warn("Invalid move for knight: cannot capture own piece");
            return false;
        } else {
            return 'capture'; // Valid capture move
        }
    }

    return true; // Valid move
};

Knight.prototype.moveTo = function(targetPosition) {
    const result = this.isValidMove(targetPosition);
    if (result === true) {
        // Move the knight to the new position
        this.position = targetPosition.col + targetPosition.row;
        this.render();
        return true;
    } else if (result === 'capture') {
        // Capture the piece and move
        let pieceToCapture = this.board.getPieceAt(targetPosition);
        if (pieceToCapture) {
            pieceToCapture.kill();
        }
        this.position = targetPosition.col + targetPosition.row;
        this.render();
        return true;
    }
    return false; // Invalid move
};

Knight.prototype.kill = function() {
    if (this.$el && this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el);
    }
    this.position = null;
};