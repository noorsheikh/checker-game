// GAMEBOARD HTML FROM: https://github.com/codethejason/checkers/blob/master/index.html

import King1 from './img/king1.png';
import King2 from './img/king2.png';
import PropTypes from 'prop-types';
import React from 'react';

import './style.scss';

const DEBUG = true;
const dictionary = ["0vmin", "10vmin", "20vmin", "30vmin", "40vmin", "50vmin", "60vmin", "70vmin", "80vmin", "90vmin"];

function dist(x1, y1, x2, y2)
{
    return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
}

function Stats(props)
{
    var turnBackground = "linear-gradient(to right, transparent 50%, #BEEE62 50%)";
    if (props.playerTurn === 1)
    {
        turnBackground = "linear-gradient(to right, #BEEE62 50%, transparent 50%)";
    }

    var turnStyle = {
        background: turnBackground
    }

    var p1idx = 0;
    var p1score = [];
    while (p1idx < props.player1score)
    {
        p1score.push(<div key={p1idx} className='capturedPiece'></div>);
        p1idx++;
    }

    var p2idx = 0;
    var p2score = [];
    while (p2idx < props.player2score)
    {
        p2score.push(<div key={p2idx} className='capturedPiece'></div>);
        p2idx++;
    }
    
    return (
    <div className="stats">
        <h2>Game Statistics</h2>
        <div className="wrapper">
            <div id="player1">
                <h3>{props.player1 + " (Top)"}</h3>
                {[p1score]}
            </div>
            <div id="player2">
                <h3>{props.player2 + " (Bottom)"}</h3>
                {[p2score]}
            </div>
        </div>
        <div className="turn" style={turnStyle}/>
    </div>);
}

function Info()
{
    return (
        <div className="info">
            <h1>Checkers</h1>
            <hr />
        </div>
    );
}

function Pieces(props) {
    var player1pieces = [];
    var player2pieces = [];

    for (let idx in props.pieces)
    {
        var piece = props.pieces[idx];
        if (piece.props.player === 1) player1pieces.push(piece);
        else if (piece.props.player === 2) player2pieces.push(piece);
    }

    return (
        <div className="pieces">
            <div className="player1pieces">
                {[player1pieces]}
            </div>
            <div className="player2pieces">
                {[player2pieces]}
            </div>
        </div>
    );
}

class Tile extends React.Component {
    static propTypes = {
        position: PropTypes.object.isRequired
    };

    constructor(props)
    {
        super(props);

        this.position = this.props.position;
    }
    
    render()
    {
        var style = {
            top: dictionary[this.props.position.row],
            left: dictionary[this.props.position.column]
        };
        
        return (
            <div className="tile" style={style} onClick={()=> this.props.handleClick(this.props.position)}/>
        )
    }
}

class Piece extends React.Component {
    static propTypes = {
        king: PropTypes.bool.isRequired,
        player: PropTypes.number.isRequired,
        playerTurn: PropTypes.number.isRequired,
        position: PropTypes.object.isRequired,
        selected: PropTypes.bool.isRequired
    };

    constructor(props)
    {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    onClick()
    {
        this.props.handleClick(this.props.player, this.props.position, this.props.king);
    }

    render()
    {
        var style = {
            top: dictionary[this.props.position.row],
            left: dictionary[this.props.position.column]
        };

        var className = "piece";
        if (this.props.selected && this.props.playerTurn === this.props.player)
        {
            className += " selected";
        }

        if (this.props.king)
        {
            if (this.props.player === 1) style.backgroundImage = 'url(' + King1 + ')';
            else if (this.props.player === 2) style.backgroundImage = 'url(' + King2 + ')';
        }
        
        return (
            <div className={className} style={style} onClick={this.onClick}/>
        )
    }
}

class Board extends React.Component {
    constructor()
    {
        super();

        this.state = {
            boardState: [
                [0, 1, 0, 1, 0, 1, 0, 1],
                [1, 0, 1, 0, 1, 0, 1, 0],
                [0, 1, 0, 1, 0, 1, 0, 1],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [2, 0, 2, 0, 2, 0, 2, 0],
                [0, 2, 0, 2, 0, 2, 0, 2],
                [2, 0, 2, 0, 2, 0, 2, 0]],
            player1score: 0,
            player2score: 0,
            playerTurn: 1,
            jumpExist: false,
            continuousJump: false,
            selectedPiece: null
        }

        this.onTileClick = this.onTileClick.bind(this);
        this.onPieceClick = this.onPieceClick.bind(this);

        this.pieces = [];
    }

    tick()
    {
        // TODO: Pull game board state from server and update state
    }
    
    componentDidMount()
    {
        this.interval = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount()
    {
        clearInterval(this.interval);
    }

    isValidPlaceToMove(tilePosition)
    {
        var row = tilePosition.row;
        var column = tilePosition.column;
        if (row < 0 || row > 7 || column < 0 || column > 7) return false;
        var ret = false;
        if (this.state.boardState[row][column] === 0) {
            ret = true;
        }
        //if (DEBUG) console.log("isValidPlaceToMove:" + ret);
        return ret;
    }

    makeKing(position)
    {
        var boardState = this.state.boardState;
        if (boardState[position.row][position.column] === 1)
        {
            boardState[position.row][position.column] = 3;
        }
        else if (boardState[position.row][position.column] === 2)
        {
            boardState[position.row][position.column] = 4;
        }
        this.setState({ boardState: boardState });
    }

    getBoardValue(selectedPiece)
    {
        if (selectedPiece !== null)
        {
            if (selectedPiece.king)
            {
                if (selectedPiece.player === 1) return 3;
                else if (selectedPiece.player === 2) return 4;
            }
            else return selectedPiece.player;
        }
    }

    toggleTurn()
    {
        this.setState({ playerTurn: (this.state.playerTurn === 1) ? 2 : 1 });
    }

    movePiece(tilePosition)
    {
        var selectedPiece = this.state.selectedPiece;
        var boardState = this.state.boardState;

        if (selectedPiece)
        {
            if (selectedPiece.player !== this.state.playerTurn) return;

            //make sure piece doesn't go backwards if it's not a king
            if (selectedPiece.player === 1 && selectedPiece.king === false) {
                if (tilePosition.row < selectedPiece.position.row) return false;
            } else if (selectedPiece.player === 2 && selectedPiece.king === false) {
                if (tilePosition.row > selectedPiece.position.row) return false;
            }
            //remove the mark from board and put it in the new spot
            boardState[selectedPiece.position.row][selectedPiece.position.column] = 0;

            boardState[tilePosition.row][tilePosition.column] = this.getBoardValue(selectedPiece);
            this.setState({ boardState: boardState });
            //if piece reaches the end of the row on opposite side crown it a king (can move all directions)
            if (!selectedPiece.king && (selectedPiece.position.row === 0 || selectedPiece.position.row === 7))
                this.makeKing(tilePosition);
        }
    }

    removePiece(position)
    {
        if (DEBUG) console.log("removePiece:" + JSON.stringify(position));
        var boardState = this.state.boardState;
        var player = this.state.boardState[position.row][position.column];
        console.log(player);
        if (player === 1) this.setState({ player2score: this.state.player2score + 1 });
        else if (player === 2) this.setState({ player1score: this.state.player1score + 1 });
        boardState[position.row][position.column] = 0;
        this.setState({ boardState: boardState });
    }

    ifWinner()
    {
        if (this.state.player1score === 12) return 1;
        else if (this.state.player2score === 12) return 2;
        else return false;
    }

    inRange(tilePosition)
    {
        var piece = this.state.selectedPiece;
        if (piece) {
            for (var idx in this.pieces) {
                var k = this.pieces[idx];
                if (k.props.position.row === tilePosition.row && k.props.position.column === tilePosition.column) return 'wrong';
            }
            if (!piece.king && piece.player === 1 && tilePosition.row < piece.position.row) return 'wrong';
            if (!piece.king && piece.player === 2 && tilePosition.row > piece.position.row) return 'wrong';
            if (dist(tilePosition.row, tilePosition.column, piece.position.row, piece.position.column) === Math.sqrt(2)) {
                //regular move
                return 'regular';
            } else if (dist(tilePosition.row, tilePosition.column, piece.position.row, piece.position.column) === 2 * Math.sqrt(2)) {
                //jump move
                return 'jump';
            }
            else {
                return 'wrong';
            }
        }
    }

    canJumpAny() {
        var piece = this.state.selectedPiece;
        if (piece !== null)
        {
            var ret = (this.canOpponentJump({ row: piece.position.row + 2, column: piece.position.column + 2 }) ||
            this.canOpponentJump({ row: piece.position.row + 2, column: piece.position.column - 2 }) ||
            this.canOpponentJump({ row: piece.position.row - 2, column: piece.position.column + 2 }) ||
            this.canOpponentJump({ row: piece.position.row - 2, column: piece.position.column - 2 }));

            if (DEBUG) console.log("canJumpAny:" + ret);
            return ret;
        }
        return false;
    };

    canOpponentJump(newPosition)
    {
        var piece = this.state.selectedPiece;
        if (piece)
        {
            //find what the displacement is
            var dx = newPosition.column - piece.position.column;
            var dy = newPosition.row - piece.position.row;
            //make sure object doesn't go backwards if not a king
            if (piece.player === 1 && piece.king === false) {
                if (newPosition.row < piece.position.row) return false;
            } else if (piece.player === 2 && piece.king === false) {
                if (newPosition.row > piece.position.row) return false;
            }
            //must be in bounds
            if (newPosition.row > 7 || newPosition.column > 7 || newPosition.row < 0 || newPosition.column < 0) return false;
            //middle tile where the piece to be conquered sits
            var tileToCheckx = piece.position.column + (dx / 2);
            var tileToChecky = piece.position.row + (dy / 2);
            if (tileToCheckx > 7 || tileToChecky > 7 || tileToCheckx < 0 || tileToChecky < 0) return false;
            //if there is a piece there and there is no piece in the space after that
            if (!this.isValidPlaceToMove({ row: tileToCheckx, colmn: tileToChecky }) && this.isValidPlaceToMove({ row: newPosition.row, column: newPosition.column })) {
                for (let pieceIndex in this.pieces) {
                    var thisPiece = this.pieces[pieceIndex].props;
                    if (thisPiece.position.row === tileToChecky && thisPiece.position.column === tileToCheckx) {
                        if (piece.player !== thisPiece.player) {
                            //return the piece sitting there
                            var ret = thisPiece.position;

                            if (DEBUG) console.log("canOpponentJump:" + JSON.stringify(ret));
                            return ret;
                        }
                    }
                }
            }
            return false;
        }
    }

    opponentJump(tilePosition)
    {
        var jumpPosition = this.canOpponentJump(tilePosition);
        if (jumpPosition)
        {
            this.removePiece(jumpPosition);
            return true;
        }
        return false;
    }

    onTileClick(tilePosition)
    {
        if (DEBUG) console.log("onTileClick:" + JSON.stringify({tilePosition}));

        var inRange = this.inRange(tilePosition);
        console.log(inRange);
        if (inRange !== 'wrong') {
            if (inRange === 'jump') {
                if (this.opponentJump(tilePosition)) {
                    this.movePiece(tilePosition);
                    if (this.canJumpAny()) {
                        this.setState({ continuousJump: true });
                    }
                    else {
                        this.toggleTurn();
                    }
                }
            }
            else if (inRange === 'regular' && !this.state.jumpExist) {
                if (!this.canJumpAny())
                {
                    this.movePiece(tilePosition);
                    this.toggleTurn();
                }
                else {
                    alert("You must jump when possible!");
                }
            }
        }

        if (!this.isValidPlaceToMove(tilePosition)) return;
        this.movePiece(tilePosition);
    }

    onPieceClick(player, position, king)
    {
        if (DEBUG) console.log("onPieceClick:" + JSON.stringify({player, position, king}));

        if (this.state.playerTurn === player)
        {
            if (this.state.selectedPiece !== null)
            {
                if (this.state.selectedPiece.position.row === position.row &&
                    this.state.selectedPiece.position.column === position.column) {
                    this.setState({ selectedPiece: null });
                }
                else {
                    this.setState({ selectedPiece: {player: player, position: position, king: king} });
                }
            }
            else {
                this.setState({ selectedPiece: {player: player, position: position, king: king} });
            }
        }
    }

    render()
    {
        var tiles = [];
        var pieces = [];

        for (let row = 0; row < 8; row++)
        {
            var oddRow = (row % 2 !== 0) ? true : false;
            for (let column = 0; column < 8; column++)
            {
                var oddColumn = (column % 2 !== 0) ? true : false;
                var position = { row: row, column: column };
                var tileID = "tile" + ((row * 8) + (column + 1));

                var validTile = false;
                if (oddRow)
                {
                    if (!oddColumn)
                    {
                        validTile = true;
                    }
                }
                else
                {
                    if (oddColumn)
                    {
                        validTile = true;
                    }
                }

                var selected = false;
                if (this.state.selectedPiece !== null)
                {
                    if (this.state.selectedPiece.position.row === position.row
                        && this.state.selectedPiece.position.column === position.column)
                    {
                        selected = true;
                    }
                }

                if (validTile)
                {
                    tiles.push(<Tile key={tileID} position={position} handleClick={this.onTileClick}/>);

                    if (this.state.boardState[row][column] !== 0)
                    {
                        var player = 1;
                        var king = false;
                        if (this.state.boardState[row][column] === 2)
                        {
                            player = 2;
                        }
                        else if (this.state.boardState[row][column] === 3)
                        {
                            king = true;
                        }
                        else if (this.state.boardState[row][column] === 4)
                        {
                            player = 2;
                            king = true;
                        }

                        var piece = <Piece
                                    key={pieces.length}
                                    player={player}
                                    position={position}
                                    king={king}
                                    selected={selected}
                                    playerTurn={this.state.playerTurn}
                                    handleClick={this.onPieceClick}/>;
                        pieces.push(piece);
                    }
                }
            }
        }
        this.pieces = pieces;

        return (
            <body>
                <div className="column">
                    <Info/>
                    <Stats
                        playerTurn={this.state.playerTurn}
                        player1="Player 1" player2="Player 2"
                        player1score={this.state.player1score}
                        player2score={this.state.player2score}/>
                </div>
                <div className="column">
                    <div className="board">
                        {[tiles]}
                        <Pieces pieces={pieces}/>
                    </div>
                </div>
            </body>
        )
    }
}

function GameBoard() {
    return (
        <Board />
    );
}

export default GameBoard;